import { relations } from 'drizzle-orm';
import { integer, pgTable, text, varchar } from 'drizzle-orm/pg-core';
import { TUser, users } from './user';

export const posts = pgTable('posts', {
  id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description').notNull(),
  content: text('content').notNull(),
  authorId: integer('author_id')
    .references(() => users.id, {
      onDelete: 'set null',
      onUpdate: 'set null',
    })
    .notNull(),
});

export const postsRelations = relations(posts, ({ one, many }) => ({
  author: one(users, {
    fields: [posts.authorId],
    references: [users.id],
  }),
}));

export type TPost = typeof posts.$inferSelect & {
  author: TUser;
};
export type TInsertPost = typeof posts.$inferInsert;
export type TUpdatePost = Partial<TInsertPost>;
