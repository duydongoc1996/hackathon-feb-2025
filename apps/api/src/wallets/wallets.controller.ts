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
  type TInsertWallet,
  type TUpdateWallet,
} from 'src/database/schemas/wallet';
import { WalletsService } from './wallets.service';

@Controller('wallets')
export class WalletsController {
  constructor(@Inject(WalletsService) private walletsService: WalletsService) {}

  @Get('')
  async find() {
    return this.walletsService.find();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.walletsService.findOne(id);
  }

  @Post('')
  async create(@Body() data: TInsertWallet) {
    return this.walletsService.create(data);
  }

  @Patch(':id')
  async update(@Body() data: TUpdateWallet, @Param('id') id: number) {
    return this.walletsService.update(id, data);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.walletsService.delete(id);
  }
}
