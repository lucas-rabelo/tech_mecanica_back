import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber } from 'class-validator';
import { ReadModuleResponseDto } from './read-module-response.dto';

export class ListModuleResponseDto {
  @ApiProperty()
  @IsNumber()
  total: number;

  @ApiProperty({ type: [ReadModuleResponseDto] })
  @IsArray()
  modules: ReadModuleResponseDto[];
}
