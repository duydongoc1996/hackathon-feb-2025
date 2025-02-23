import { Inject, Injectable } from '@nestjs/common';
import { Almanac, Engine, Event, Rule } from 'json-rules-engine';
import { DataSource, type DB } from 'src/database/database.service';
import { type TQuest } from 'src/database/schemas/quest';
import { type TUser } from 'src/database/schemas/user';
import { type TUserQuest } from 'src/database/schemas/user-quest';
import { TWallet } from 'src/database/schemas/wallet';

@Injectable()
export class QuestValidator {
  constructor(@Inject(DataSource) private db: DB) {}

  async validate(data: {
    user: TUser;
    wallets: TWallet[];
    quest: TQuest;
    joinedQuests: TUserQuest[];
  }) {
    try {
      const engine = new Engine();

      // Add rule
      engine.addRule(data.quest.conditions as Rule);

      // Facts
      engine.addFact('user', data.user);
      engine.addFact('quest', data.quest);
      data.wallets.forEach((wallet) => {
        return engine.addFact('wallet', wallet);
      });
      data.joinedQuests.forEach((joinedQuest) => {
        return engine.addFact('joined_quest', joinedQuest);
      });

      const result = await engine.run();
      return result.events.filter(Boolean);
    } catch (e) {
      console.error(e);
      return [];
    }
  }

  async reward(data: {
    user: TUser;
    wallets: TWallet[];
    quest: TQuest;
    joinedQuests: TUserQuest[];
    userQuest: TUserQuest;
  }) {
    try {
      const engine = new Engine();

      // Add rule
      engine.addRule({
        ...(data.quest.rewards as Rule),
        onSuccess: async (event: Event, almanac: Almanac) => {
          const params = event.params || {};
          const isDynamic = params.dynamic as boolean | undefined;
          if (isDynamic) {
            const multiplier = await this.getMultiplier();
            params.quantity *= multiplier;
            event.params = params;
          }
        },
      } as unknown as Rule);

      // Facts
      engine.addFact('user', data.user);
      engine.addFact('quest', data.quest);
      engine.addFact('user_quest', data.userQuest);
      data.wallets.forEach((wallet) => {
        return engine.addFact('wallet', wallet);
      });
      data.joinedQuests.forEach((joinedQuest) => {
        return engine.addFact('joined_quest', joinedQuest);
      });

      const result = await engine.run();
      return result.events.filter(Boolean);
    } catch (e) {
      console.error(e);
      return [];
    }
  }

  async getMultiplier(): Promise<number> {
    return new Promise((r) => r(1.5));
  }
}
