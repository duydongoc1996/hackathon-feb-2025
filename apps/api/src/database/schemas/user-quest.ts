import { relations } from 'drizzle-orm';
import { integer, pgTable, varchar } from 'drizzle-orm/pg-core';
import { quests } from './quest';
import { type TUser, users } from './user';

export const userQuests = pgTable('userQuests', {
  id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
  status: varchar('status', { length: 255 }).notNull(),

  questId: integer('quest_id')
    .references(() => quests.id, {
      onDelete: 'set null',
      onUpdate: 'set null',
    })
    .notNull(),

  userId: integer('user_id')
    .references(() => users.id, {
      onDelete: 'set null',
      onUpdate: 'set null',
    })
    .notNull(),
});

export const userQuestsRelations = relations(userQuests, ({ one, many }) => ({
  user: one(users, {
    fields: [userQuests.userId],
    references: [users.id],
  }),
  quest: one(quests, {
    fields: [userQuests.questId],
    references: [quests.id],
  }),
}));

export type TUserQuest = typeof userQuests.$inferSelect & {
  user?: TUser;
};
export type TInsertUserQuest = typeof userQuests.$inferInsert;
export type TUpdateUserQuest = Partial<TInsertUserQuest>;
