import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import {
  type TInsertQuest,
  type TUpdateQuest,
} from 'src/database/schemas/quest';
import { QuestsService } from './quests.service';

@Controller('quests')
export class QuestsController {
  constructor(@Inject(QuestsService) private questsService: QuestsService) {}

  @Get('')
  async find() {
    return this.questsService.find();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.questsService.findOne(id);
  }

  @Post('')
  async create(@Body() data: TInsertQuest) {
    return this.questsService.create(data);
  }

  @Patch(':id')
  async update(@Body() data: TUpdateQuest, @Param('id') id: number) {
    return this.questsService.update(id, data);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.questsService.delete(id);
  }

  @Post('join')
  async join(@Body() data: { userId: number; questId: number }) {
    return this.questsService.join(data.userId, data.questId);
  }

  @Post('reward')
  async reward(@Body() data: { userId: number; questId: number }) {
    return this.questsService.reward(data.userId, data.questId);
  }
}
