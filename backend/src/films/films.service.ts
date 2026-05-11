import { Injectable, NotFoundException } from '@nestjs/common';
import { FilmsRepository } from './films.repository';

@Injectable()
export class FilmsService {
  constructor(private readonly filmsRepository: FilmsRepository) {}

  async findAll() {
    const films = await this.filmsRepository.findAll();
    return films.map((film) => ({
      id: film._id,
      title: film.title,
      description: film.description,
      duration: film.duration,
      poster: film.poster,
    }));
  }

  async findSchedule(id: string) {
    const film = await this.filmsRepository.findById(id);

    if (!film) {
      throw new NotFoundException(`Фильм с ID ${id} не найден`);
    }

    const schedule = film.schedule || [];

    return {
      id: film._id,
      title: film.title,
      description: film.description,
      duration: film.duration,
      poster: film.poster,
      sessions: schedule,
    };
  }
}
