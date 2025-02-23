import { Inject, Injectable } from '@nestjs/common';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import schemas from './schemas';

export type DB = ReturnType<typeof drizzle<typeof schemas>>;
export const DataSource = 'DATA_SOURCE';

@Injectable()
export class DataSourceFactory {
  #db: DB;

  constructor(@Inject('DATABASE_POOL') private pool: Pool) {
    this.#db = drizzle({
      client: this.pool,
      schema: schemas,
    });
  }

  getDB() {
    return this.#db;
  }
}
