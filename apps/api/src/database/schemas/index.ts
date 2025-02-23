import { quests, questsRelations } from './quest';
import { users, usersRelations } from './user';
import { userQuests, userQuestsRelations } from './user-quest';
import { wallets, walletsRelations } from './wallet';

const tables = {
  users,
  wallets,
  quests,
  userQuests,
};
const relations = {
  usersRelations,
  walletsRelations,
  questsRelations,
  userQuestsRelations,
};

const schemas = {
  ...tables,
  ...relations,
};
export default schemas;

export type TTable = (typeof tables)[keyof typeof tables];
export type TRelation = (typeof relations)[keyof typeof relations];
