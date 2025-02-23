import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Pool } from 'pg';
import { DataSource, DataSourceFactory } from './database.service';

const dataSourceProvider = {
  provide: DataSource,
  inject: [{ token: 'DATABASE_POOL', optional: false }],
  useFactory: (pool: Pool) => new DataSourceFactory(pool).getDB(),
};

@Global()
@Module({
  providers: [
    {
      provide: 'DATABASE_POOL',
      useFactory: async (configService: ConfigService) => {
        const pool = new Pool({
          host: configService.get<string>('DB_HOST'),
          port: configService.get<number>('DB_PORT'),
          user: configService.get<string>('DB_USERNAME'),
          password: configService.get<string>('DB_PASSWORD'),
          database: configService.get<string>('DB_DATABASE'),
        });
        await pool.connect(); // Connect to the database
        return pool;
      },
      inject: [ConfigService],
    },
    dataSourceProvider,
  ],
  exports: [dataSourceProvider],
})
export class DatabaseModule {}
