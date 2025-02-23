import { Inject, Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { DataSource, type DB } from 'src/database/database.service';
import {
  type TInsertUserQuest,
  type TUpdateUserQuest,
  userQuests,
} from 'src/database/schemas/user-quest';

@Injectable()
export class UserQuestsService {
  constructor(@Inject(DataSource) private db: DB) {
    console.log('UserQuestsService instantiated');
  }

  async find() {
    return this.db.query.userQuests.findMany();
  }

  async findOne(id: number) {
    return this.db.query.userQuests.findFirst({
      where: eq(userQuests.id, id),
    });
  }

  async create(data: TInsertUserQuest) {
    return this.db.insert(userQuests).values(data).returning().execute();
  }

  async update(id: number, data: TUpdateUserQuest) {
    return this.db
      .update(userQuests)
      .set(data)
      .where(eq(userQuests.id, id))
      .returning()
      .execute();
  }

  async delete(id: number) {
    return this.db
      .delete(userQuests)
      .where(eq(userQuests.id, id))
      .returning()
      .execute();
  }
}
