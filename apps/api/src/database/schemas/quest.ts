import { relations } from 'drizzle-orm';
import { integer, json, pgTable, text, varchar } from 'drizzle-orm/pg-core';

export const quests = pgTable('quests', {
  id: integer('id').primaryKey().generatedByDefaultAsIdentity(),
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description').notNull(),
  season: integer('season').notNull(),
  facts: json('facts').default({}),
  conditions: json('conditions').default({}),
  rewards: json('rewards').default({}),
});

export const questsRelations = relations(quests, ({ one, many }) => ({}));

export type TQuest = typeof quests.$inferSelect & {};
export type TInsertQuest = typeof quests.$inferInsert;
export type TUpdateQuest = Partial<TInsertQuest>;
