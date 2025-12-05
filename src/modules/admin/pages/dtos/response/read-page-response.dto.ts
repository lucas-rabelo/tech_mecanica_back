import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNumber, IsString } from 'class-validator';
import { ReadModuleResponseDto } from '../../../modules';

export class ReadPageResponseDto {
  @ApiProperty({ example: 1 })
  @IsNumber()
  id: number;

  @ApiProperty({ example: 'Administrador' })
  @IsString()
  name: string;

  @ApiProperty({ type: ReadModuleResponseDto })
  module: ReadModuleResponseDto;
  
  @ApiProperty({ example: '2025-11-12T16:25:00.000Z' })
  @IsDateString()
  createdAt: string;
  
  @ApiProperty({ nullable: true, example: '2025-11-12T16:25:00.000Z' })
  @IsDateString()
  updatedAt: string | null;
}
