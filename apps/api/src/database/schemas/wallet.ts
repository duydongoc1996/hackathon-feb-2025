import { relations } from 'drizzle-orm';
import { integer, pgTable, varchar } from 'drizzle-orm/pg-core';
import { TUser, users } from './user';

export const wallets = pgTable('wallets', {
  id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
  address: varchar('address', { length: 255 }).notNull(),
  blockchain: varchar('blockchain').notNull(),

  userId: integer('user_id')
    .references(() => users.id, {
      onDelete: 'set null',
      onUpdate: 'set null',
    })
    .notNull(),
});

export const walletsRelations = relations(wallets, ({ one, many }) => ({
  user: one(users, {
    fields: [wallets.userId],
    references: [users.id],
  }),
}));

export type TWallet = typeof wallets.$inferSelect & {
  user?: TUser;
};
export type TInsertWallet = typeof wallets.$inferInsert;
export type TUpdateWallet = Partial<TInsertWallet>;
