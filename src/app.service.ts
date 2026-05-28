import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Inventory } from './inventary';
import { User } from './user';
import { MoneyTransition } from './moneytransition';
import { BuyInventoryDto } from './buyinginventary';
import { InventoryQuery } from './query';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Inventory)
    private readonly inventoryRepository: Repository<Inventory>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(MoneyTransition)
    private readonly moneyTransitionRepository: Repository<MoneyTransition>,
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
}
