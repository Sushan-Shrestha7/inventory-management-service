import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Inventory } from './inventary';
import { MoneyTransition } from './moneytransition';
import { User } from './user';
import { dataSourceOptions, jwtConstants } from './data-source';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions as TypeOrmModuleOptions),
    TypeOrmModule.forFeature([User, Inventory, MoneyTransition]),
    PassportModule,

    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: jwtConstants.expiresIn },
    }),
    ConfigModule.forRoot({
      isGlobal:true
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
