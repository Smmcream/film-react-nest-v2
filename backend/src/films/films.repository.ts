import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Film } from './schemas/film.schema';

@Injectable()
export class FilmsRepository {
  constructor(@InjectModel(Film.name) private filmModel: Model<Film>) {}

  async findAll(): Promise<Film[]> {
    return this.filmModel.find().exec();
  }

  async findById(id: string): Promise<Film | null> {
    return this.filmModel.findById(id).exec();
  }

  async findSession(
    filmId: string,
    sessionId: string,
  ): Promise<{ film: Film; session: any } | null> {
    const film = await this.filmModel.findById(filmId).exec();
    if (!film) return null;

    // Теперь schedule есть в типе Film!
    const session = film.schedule.find((s) => s.id === sessionId);
    if (!session) return null;

    return { film, session };
  }

  async bookSeats(
    filmId: string,
    sessionId: string,
    seats: { row: number; seat: number }[],
  ): Promise<boolean> {
    const film = await this.filmModel.findById(filmId).exec();
    if (!film) return false;

    const session = film.schedule.find((s) => s.id === sessionId);
    if (!session) return false;

    const seatsToBook = seats.map((seat) => `${seat.row}:${seat.seat}`);
    const alreadyBooked = seatsToBook.some((seat) =>
      session.taken.includes(seat),
    );

    if (alreadyBooked) return false;

    session.taken.push(...seatsToBook);
    await film.save();

    return true;
  }
}
