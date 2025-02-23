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
import { type TInsertUser, type TUpdateUser } from 'src/database/schemas/user';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(@Inject(UsersService) private usersService: UsersService) {}

  @Get('')
  async find() {
    return this.usersService.find();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.usersService.findOne(id);
  }

  @Post('')
  async create(@Body() data: TInsertUser) {
    return this.usersService.create(data);
  }

  @Patch(':id')
  async update(@Body() data: TUpdateUser, @Param('id') id: number) {
    return this.usersService.update(id, data);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.usersService.delete(id);
  }
}
