import { Inject, Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { DataSource, type DB } from 'src/database/database.service';
import {
  TUpdateWallet,
  wallets,
  type TInsertWallet,
} from 'src/database/schemas/wallet';

@Injectable()
export class WalletsService {
  constructor(@Inject(DataSource) private db: DB) {
    console.log('WalletsService instantiated');
  }

  async find() {
    return this.db.query.wallets.findMany();
  }

  async findOne(id: number) {
    return this.db.query.wallets.findFirst({
      where: eq(wallets.id, id),
    });
  }

  async create(data: TInsertWallet) {
    return this.db.insert(wallets).values(data).returning().execute();
  }

  async update(id: number, data: TUpdateWallet) {
    return this.db
      .update(wallets)
      .set(data)
      .where(eq(wallets.id, id))
      .returning()
      .execute();
  }

  async delete(id: number) {
    return this.db
      .delete(wallets)
      .where(eq(wallets.id, id))
      .returning()
      .execute();
  }
}
