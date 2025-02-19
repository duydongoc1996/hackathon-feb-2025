import { relations } from 'drizzle-orm';
import { integer, pgEnum, pgTable, varchar } from 'drizzle-orm/pg-core';
import { UserStatus } from '../../common/enum';
import { posts } from './post';

export const userStatus = pgEnum('status', [
  UserStatus.ACTIVE,
  UserStatus.INACTIVE,
]);

export const users = pgTable('users', {
  id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
  name: varchar('name', { length: 255 }).notNull(),
  age: integer('age').notNull(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  status: userStatus().default(UserStatus.ACTIVE).notNull(),
});

export const usersRelations = relations(users, ({ many }) => ({
  posts: many(posts),
}));

export type TUser = typeof users.$inferInsert;
export type TSelectUser = typeof users.$inferSelect;
export type TUpdateUser = Partial<TUser>;
