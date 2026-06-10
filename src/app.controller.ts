import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AppService } from './app.service';
import { BuyInventoryDto } from './buyinginventary';
import { User } from './user';
import { Inventory } from './inventary';
import { InventoryQuery } from './query';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from './jwt-auth.guard';
import { RolesGuard } from './roles.guard';
import { Roles } from './roles.decorator';
import { Role } from './role.enum';
import type { AuthRequest } from './auth-request.interface';
import { LoginDto } from './login_dto';

@Controller('inventory')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('buy')
  @ApiOperation({ summary: 'Buy the different things' }) // fixed syntax
  async buyInventory(  @Body() dto: BuyInventoryDto) {
    return await this.appService.buyInventory(dto);
  }

  @Post('create-user')
  @ApiOperation({ summary: 'Create a new user' })
  async createUser(@Body() dto: User) {
    return await this.appService.createuser(dto);
  }

  @Post('create-inventory')
  @ApiOperation({ summary: 'Create a new inventory item' })
  async createInventory(@Body() dto: Inventory) {
    return await this.appService.createInventory(dto);
  }

  @Get('users/:id')
  @ApiOperation({ summary: 'Get a user by ID' })
  async getUsers(@Param('id') id: number) {
    return await this.appService.getUsersbyId(id);
  }

  @Get('inventories/:id')
  @ApiOperation({ summary: 'Get an inventory item by ID' })
  async getInventories(@Param('id') id: number) {
    return await this.appService.getInventoriesbyId(id);
  }

  @Delete('users/:id')
  @ApiOperation({ summary: 'Delete a user by ID' })
  async deleteUser(@Param('id') id: number) {
    return await this.appService.deleteUser(id);
  }

  @Get('inventories')
  @ApiOperation({ summary: 'Get inventory items by name' })
  async getbyinventoryname(@Query('name') name: InventoryQuery) {
    console.log(name);
    return await this.appService.getbyinventoryname(name);
  }

  @Post('register')
  @ApiOperation({ summary: 'Register a new user' })
  async register(@Body() dto: User) {
    return this.appService.register(dto);
  }

  @Post('login')
  @ApiOperation({ summary: 'Login a user' })
  async login(@Body() dto: LoginDto) {
    const user = await this.appService.validateUser(dto.email, dto.password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return this.appService.login(user);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @ApiOperation({ summary: 'Get log (admin only)' })
  @Get('/getLog')
  getAllallalla() {
    return 'hlo world';
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get the currently logged-in user' })
  @Get('/getLogInUser')
  async getloginalluser(@Req() req: AuthRequest) {
    const userid = req.user.sub;
    return this.appService.getoneuser(userid);
  }
}
