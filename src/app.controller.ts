import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { BuyInventoryDto } from './buyinginventary';
import { User } from './user';
import { Inventory } from './inventary';

@Controller('inventory')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('buy')
  async buyInventory(@Body() dto: BuyInventoryDto) {
    return await this.appService.buyInventory(dto);
  }
  @Post('create-user')
  async createUser(@Body() dto: User) {
    return await this.appService.createuser(dto);
  }
  @Post('create-inventory')
  async createInventory(@Body() dto: Inventory) {
    return await this.appService.createInventory(dto);
  }
  @Get('users/:id')
  async getUsers(@Param('id') id: number) {
    return await this.appService.getUsersbyId(id);
  }
  @Get('inventories/:id')
  async getInventories(@Param('id') id: number) {
    return await this.appService.getInventoriesbyId(id);
  }
  @Delete('users/:id')
  async deleteUser(@Param('id') id: number) {
    return await this.appService.deleteUser(id);
  }
}
