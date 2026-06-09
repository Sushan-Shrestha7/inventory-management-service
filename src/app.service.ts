import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { Inventory } from './inventary';
import { User } from './user';
import { MoneyTransition } from './moneytransition';
import { BuyInventoryDto } from './buyinginventary';
import { InventoryQuery } from './query';
import * as bycrypt from 'bcryptjs';
import { Role } from './role.enum';
import { JwtPayload } from './payload.interface';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Inventory)
    private readonly inventoryRepository: Repository<Inventory>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(MoneyTransition)
    private readonly moneyTransitionRepository: Repository<MoneyTransition>,
    private readonly jwtService: JwtService,
  ) {}
  async createuser(dto: User) {
    return await this.userRepository.save(dto);
  }
  async createInventory(dto: Inventory) {
    return await this.inventoryRepository.save(dto);
  }
  async getUsersbyId(id: number) {
    return await this.userRepository.findOne({
      where: { id },
    });
  }
  async getInventoriesbyId(id: number) {
    return await this.inventoryRepository.findOne({
      where: { id },
    });
  }
  async buyInventory(dto: BuyInventoryDto) {
    const inventory = await this.inventoryRepository.findOne({
      where: { id: dto.inventoryId },
    });

    if (!inventory) {
      throw new NotFoundException('Inventory item not found');
    }

    if (inventory.quantity < dto.quantity) {
      throw new BadRequestException('Not enough quantity in inventory');
    }

    const user = await this.userRepository.findOne({
      where: { id: dto.userId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }
    inventory.quantity -= dto.quantity;
    await this.inventoryRepository.save(inventory);
    const transaction = this.moneyTransitionRepository.create({
      quantity: dto.quantity,
      totalAmount: dto.quantity * inventory.price,
      type: 'buy',
      date: new Date(),
      user: user,
      inventory: inventory,
    });

    await this.moneyTransitionRepository.save(transaction);

    return {
      message: 'Inventory purchased successfully',
      inventory: inventory,
      transaction: transaction,
    };
  }
  async deleteUser(id: number) {
    return await this.userRepository.delete(id);
  }
  async getbyinventoryname(name: InventoryQuery) {
    const { name: inventoryName } = name;
    console.log('Searching for inventory with name:', inventoryName);
    const queryBuilder =
      this.inventoryRepository.createQueryBuilder('inventory');

    if (inventoryName) {
      queryBuilder.where('inventory.name ILIKE :name', {
        name: `%${inventoryName}%`,
      });
    }
    return await queryBuilder.getMany();
  }
  async validateUserById(id: number) {
    return this.userRepository.findOne({
      where: { id },
    });
  }
  async register(dto: User) {
    const existingUser = await this.userRepository.findOne({
      where: { email: dto.email },
    });
    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }
    const hashedPassword = await bycrypt.hash(dto.password, 12);
    const newUser = this.userRepository.create({
      name: dto.name,
      email: dto.email,
      password: hashedPassword,
      role: dto.role || Role.Admin,
    });
    return await this.userRepository.save(newUser);
  }
  async login(dto: User) {
    const payload: JwtPayload = {
      sub: dto.id,
      name: dto.name,
      email: dto.email,
      role: dto.role,
    };
    const token = await Promise.resolve(this.jwtService.sign(payload));
    return {
      access_token: token,
      user: {
        id: dto.id,
        name: dto.name,
        email: dto.email,
        role: dto.role,
      },
    };
  }
  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.userRepository.findOne({
      where: { email },
    });
    if (user && (await bycrypt.compare(password, user.password))) {
      return user;
    }
    return null;
  }
  async getoneuser(id: number) {
    return await this.userRepository.findOne({
      where: { id },
    });
  }
}
