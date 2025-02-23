import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppConfigModule } from './config/config.module';
import { DatabaseModule } from './database/database.module';
import { LoggerModule } from './logger/logger.module';
import { QuestsModule } from './quests/quests.module';
import { UserQuestsModule } from './user-quests/user-quests.module';
import { UsersModule } from './users/users.module';
import { WalletsModule } from './wallets/wallets.module';

@Module({
  imports: [
    AppConfigModule,
    LoggerModule,
    DatabaseModule,
    QuestsModule,
    WalletsModule,
    UsersModule,
    UserQuestsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
