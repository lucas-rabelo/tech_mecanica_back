import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class CreateServiceMaterialRequestDto {
  @ApiProperty()
  @Type(() => Number)
  @IsNumber()
  serviceId: number;

  @ApiProperty()
  @Type(() => Number)
  @IsNumber()
  stockId: number;

  @ApiProperty()
  @Type(() => Number)
  @IsNumber()
  quantity: number;
}
