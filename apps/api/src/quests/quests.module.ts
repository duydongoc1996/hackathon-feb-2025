import { Module } from '@nestjs/common';
import { QuestValidator } from './quest-validator';
import { QuestsController } from './quests.controller';
import { QuestsService } from './quests.service';

@Module({
  controllers: [QuestsController],
  providers: [QuestsService, QuestValidator],
})
export class QuestsModule {}
