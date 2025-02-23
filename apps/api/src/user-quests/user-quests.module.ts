import { Module } from '@nestjs/common';
import { UserQuestsController } from './user-quests.controller';
import { UserQuestsService } from './user-quests.service';

@Module({
  controllers: [UserQuestsController],
  providers: [UserQuestsService],
})
export class UserQuestsModule {}
