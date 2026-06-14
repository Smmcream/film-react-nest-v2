import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Film } from '../entities/film.entity';
import { Session } from '../entities/session.entity';

@Injectable()
export class FilmsService {
  constructor(
    @InjectRepository(Film)
    private filmRepository: Repository<Film>,
    @InjectRepository(Session)
    private sessionRepository: Repository<Session>,
  ) {}

  async findAll() {
    const films = await this.filmRepository.find({
      relations: {
        sessions: true,
      },
    });
    return films.map((film) => ({
      id: film.id,
      title: film.title,
      description: film.description,
      duration: film.duration,
      poster: film.poster,
    }));
  }

  async findSchedule(id: string) {
    const film = await this.filmRepository.findOne({
      where: { id },
      relations: {
        sessions: true,
      },
    });

    if (!film) {
      throw new NotFoundException(`Фильм с ID ${id} не найден`);
    }

    return {
      id: film.id,
      title: film.title,
      description: film.description,
      duration: film.duration,
      poster: film.poster,
      sessions: film.sessions,
    };
  }
}
