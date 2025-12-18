import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';

export class ListItemsRequestDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  id?: number;

  @ApiProperty({ example: 1 })
  @Type(() => Number)
  @IsNumber()
  page: number;

  @ApiProperty({ example: 10 })
  @Type(() => Number)
  @IsNumber()
  itemsPerPage: number;
}
