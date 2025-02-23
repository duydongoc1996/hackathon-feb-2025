import { relations } from 'drizzle-orm';
import { integer, pgEnum, pgTable, varchar } from 'drizzle-orm/pg-core';
import { UserStatus } from '../../common/enum';
import { TWallet, wallets } from './wallet';

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
  wallets: many(wallets),
}));

export type TUser = typeof users.$inferSelect & {
  wallets?: TWallet[];
};
export type TInsertUser = typeof users.$inferInsert;
export type TUpdateUser = Partial<TInsertUser>;
