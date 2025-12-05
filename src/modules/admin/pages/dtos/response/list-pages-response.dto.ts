import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber } from 'class-validator';
import { ReadPageResponseDto } from './read-page-response.dto';

export class ListPagesResponseDto {
  @ApiProperty({ example: 10 })
  @IsNumber()
  total: number;

  @ApiProperty({ type: [ReadPageResponseDto] })
  @IsArray()
  pages: ReadPageResponseDto[];
}
