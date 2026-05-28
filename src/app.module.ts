import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Inventory } from './inventary';
import { MoneyTransition } from './moneytransition';
import { User } from './user';
import { dataSourceOptions } from './data-source';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions as TypeOrmModuleOptions),
    TypeOrmModule.forFeature([User, Inventory, MoneyTransition]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
