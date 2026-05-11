import { IsString, IsNumber, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class SeatDto {
  @IsNumber()
  row: number;

  @IsNumber()
  seat: number;
}

export class CreateOrderDto {
  @IsString()
  filmId: string;

  @IsString()
  sessionId: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SeatDto)
  seats: SeatDto[];
}
