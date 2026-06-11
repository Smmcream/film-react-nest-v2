import { Controller, Post, Body } from '@nestjs/common';
import { OrdersService } from './orders.service';

@Controller('order')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  async create(@Body() body: any) {
    console.log('👉 body:', body);
    return this.ordersService.createOrder(body.sessionId, body.seats);
  }
}
