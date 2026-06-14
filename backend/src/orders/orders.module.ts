import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { Session } from '../entities/session.entity';
import { Film } from '../entities/film.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Session, Film])],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
