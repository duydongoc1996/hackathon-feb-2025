import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { and, asc, eq } from 'drizzle-orm';
import { UserQuestStatus } from 'src/common/enum';
import { DataSource, type DB } from 'src/database/database.service';
import {
  quests,
  TUpdateQuest,
  type TInsertQuest,
} from 'src/database/schemas/quest';
import { users } from 'src/database/schemas/user';
import { userQuests } from 'src/database/schemas/user-quest';
import { QuestValidator } from './quest-validator';

@Injectable()
export class QuestsService {
  constructor(
    @Inject(DataSource) private db: DB,
    @Inject(QuestValidator) private questValidator: QuestValidator,
  ) {
    console.log('QuestsService instantiated');
  }

  async find() {
    return this.db.query.quests.findMany({
      orderBy: [asc(quests.id)],
    });
  }

  async findOne(id: number) {
    return this.db.query.quests.findFirst({
      where: eq(quests.id, id),
    });
  }

  async create(data: TInsertQuest) {
    return this.db.insert(quests).values(data).returning().execute();
  }

  async update(id: number, data: TUpdateQuest) {
    return this.db
      .update(quests)
      .set(data)
      .where(eq(quests.id, id))
      .returning()
      .execute();
  }

  async delete(id: number) {
    return this.db
      .delete(quests)
      .where(eq(quests.id, id))
      .returning()
      .execute();
  }

  async join(userId: number, questId: number) {
    const user = await this.db.query.users.findFirst({
      with: {
        wallets: true,
      },
      where: eq(users.id, userId),
    });
    if (!user) throw new NotFoundException('User not found');

    const quest = await this.db.query.quests.findFirst({
      where: eq(quests.id, questId),
    });
    if (!quest) throw new NotFoundException('Quest not found');

    const joinedQuests = await this.db.query.userQuests.findMany({
      with: {
        quest: {
          columns: {
            id: true,
            season: true,
            title: true,
          },
        },
      },
      where: and(eq(userQuests.userId, userId)),
    });

    return this.questValidator.validate({
      user,
      wallets: user.wallets,
      quest,
      joinedQuests,
    });
  }

  async reward(userId: number, questId: number) {
    const user = await this.db.query.users.findFirst({
      with: {
        wallets: true,
      },
      where: eq(users.id, userId),
    });
    if (!user) throw new NotFoundException('User not found');

    const quest = await this.db.query.quests.findFirst({
      where: eq(quests.id, questId),
    });
    if (!quest) throw new NotFoundException('Quest not found');

    const joinedQuests = await this.db.query.userQuests.findMany({
      with: {
        quest: {
          columns: {
            id: true,
            season: true,
            title: true,
          },
        },
      },
      where: and(
        eq(userQuests.userId, userId),
        eq(userQuests.status, UserQuestStatus.COMPLETED),
      ),
    });

    const userQuest = await this.db.query.userQuests.findFirst({
      where: and(
        eq(userQuests.userId, userId),
        eq(userQuests.questId, questId),
      ),
    });
    if (!userQuest)
      throw new NotFoundException('User does not join this quest');

    return this.questValidator.reward({
      user,
      wallets: user.wallets,
      quest,
      joinedQuests,
      userQuest,
    });
  }
}
