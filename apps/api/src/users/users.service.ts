import { Inject, Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { DataSource, type DB } from 'src/database/database.service';
import {
  TUpdateUser,
  users,
  type TInsertUser,
} from 'src/database/schemas/user';

@Injectable()
export class UsersService {
  constructor(@Inject(DataSource) private db: DB) {
    console.log('UsersService instantiated');
  }

  async find() {
    return this.db.query.users.findMany({ with: { wallets: true } });
  }

  async findOne(id: number) {
    return this.db.query.users.findFirst({
      where: eq(users.id, id),
    });
  }

  async create(data: TInsertUser) {
    return this.db.insert(users).values(data).returning().execute();
  }

  async update(id: number, data: TUpdateUser) {
    return this.db
      .update(users)
      .set(data)
      .where(eq(users.id, id))
      .returning()
      .execute();
  }

  async delete(id: number) {
    return this.db.delete(users).where(eq(users.id, id)).returning().execute();
  }
}
