import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FilmsController } from './films.controller';
import { FilmsService } from './films.service';
import { Film } from '../entities/film.entity';
import { Session } from '../entities/session.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Film, Session])],
  controllers: [FilmsController],
  providers: [FilmsService],
})
export class FilmsModule {}
