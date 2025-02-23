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
  type TInsertUserQuest,
  type TUpdateUserQuest,
} from 'src/database/schemas/user-quest';
import { UserQuestsService } from './user-quests.service';

@Controller('user-quests')
export class UserQuestsController {
  constructor(
    @Inject(UserQuestsService) private UserQuestsService: UserQuestsService,
  ) {}

  @Get('')
  async find() {
    return this.UserQuestsService.find();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.UserQuestsService.findOne(id);
  }

  @Post('')
  async create(@Body() data: TInsertUserQuest) {
    return this.UserQuestsService.create(data);
  }

  @Patch(':id')
  async update(@Body() data: TUpdateUserQuest, @Param('id') id: number) {
    return this.UserQuestsService.update(id, data);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.UserQuestsService.delete(id);
  }
}
