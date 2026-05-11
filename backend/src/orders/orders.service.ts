import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { FilmsRepository } from '../films/films.repository';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrdersService {
  constructor(private readonly filmsRepository: FilmsRepository) {}

  async create(createOrderDto: CreateOrderDto) {
    const { filmId, sessionId, seats } = createOrderDto;

    const sessionExists = await this.filmsRepository.findSession(
      filmId,
      sessionId,
    );
    if (!sessionExists) {
      throw new NotFoundException('Фильм или сеанс не найден');
    }

    const booked = await this.filmsRepository.bookSeats(
      filmId,
      sessionId,
      seats,
    );
    if (!booked) {
      throw new ConflictException('Некоторые места уже забронированы');
    }

    return {
      message: 'Билеты успешно забронированы',
      filmId,
      sessionId,
      seats,
      bookingTime: new Date().toISOString(),
    };
  }
}
