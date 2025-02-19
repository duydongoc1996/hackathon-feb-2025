import { posts, postsRelations } from './post';
import { quests, questsRelations } from './quest';
import { users, usersRelations } from './user';

const tables = {
  users,
  posts,
  quests,
};
const relations = {
  usersRelations,
  postsRelations,
  questsRelations,
};

const schemas = {
  ...tables,
  ...relations,
};
export default schemas;

export type TTable = (typeof tables)[keyof typeof tables];
export type TRelation = (typeof relations)[keyof typeof relations];
