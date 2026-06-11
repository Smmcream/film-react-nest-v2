import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Session } from '../entities/session.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Session)
    private sessionRepository: Repository<Session>,
  ) {}

  async createOrder(sessionId: string, seats: { row: number; seat: number }[]) {
    console.log('👉 sessionId:', sessionId);
    const session = await this.sessionRepository.findOne({
      where: { id: sessionId },
    });

    if (!session) {
      throw new NotFoundException('Сеанс не найден');
    }

    const seatsToBook = seats.map((seat) => `${seat.row}:${seat.seat}`);
    const alreadyBooked = seatsToBook.some((seat) =>
      session.taken.includes(seat),
    );

    if (alreadyBooked) {
      throw new ConflictException('Некоторые места уже забронированы');
    }

    session.taken.push(...seatsToBook);
    await this.sessionRepository.save(session);

    return {
      message: 'Билеты успешно забронированы',
      sessionId,
      seats,
    };
  }
}
