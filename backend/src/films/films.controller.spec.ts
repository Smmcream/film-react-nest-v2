import { Test, TestingModule } from '@nestjs/testing';
import { FilmsController } from './films.controller';
import { FilmsService } from './films.service';
import { NotFoundException } from '@nestjs/common';

describe('FilmsController', () => {
  let controller: FilmsController;
  let service: FilmsService;

  const mockFilm = {
    id: '1',
    title: 'Test Film',
    description: 'Test Description',
    duration: 120,
    poster: '/test.jpg',
  };

  const mockSchedule = {
    ...mockFilm,
    sessions: [
      {
        id: '1',
        filmId: '1',
        daytime: '2024-01-01T10:00:00Z',
        hall: 1,
        rows: 10,
        seats: 10,
        price: 350,
        taken: [],
      },
    ],
  };

  const mockFilmsService = {
    findAll: jest.fn().mockResolvedValue([mockFilm]),
    findSchedule: jest.fn().mockResolvedValue(mockSchedule),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FilmsController],
      providers: [
        {
          provide: FilmsService,
          useValue: mockFilmsService,
        },
      ],
    }).compile();

    controller = module.get<FilmsController>(FilmsController);
    service = module.get<FilmsService>(FilmsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of films', async () => {
      const result = await controller.findAll();
      expect(result).toEqual([mockFilm]);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findSchedule', () => {
    it('should return a film with schedule', async () => {
      const result = await controller.findSchedule('1');
      expect(result).toEqual(mockSchedule);
      expect(service.findSchedule).toHaveBeenCalledWith('1');
    });

    it('should throw NotFoundException if film not found', async () => {
      jest
        .spyOn(service, 'findSchedule')
        .mockRejectedValueOnce(new NotFoundException());
      await expect(controller.findSchedule('999')).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
