import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber } from 'class-validator';
import { ReadModuleResponseDto } from './read-module-response.dto';

export class ListModulesResponseDto {
  @ApiProperty({ example: 10 })
  @IsNumber()
  total: number;

  @ApiProperty({ type: [ReadModuleResponseDto] })
  @IsArray()
  modules: ReadModuleResponseDto[];
}
