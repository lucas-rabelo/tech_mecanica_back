import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber } from 'class-validator';
import { ReadTenantsResponseDto } from './read-tenants-response.dto';

export class ListTenantsResponseDto {
  @ApiProperty()
  @IsNumber()
  total: number;

  @ApiProperty({ type: [ReadTenantsResponseDto] })
  @IsArray()
  tenants: ReadTenantsResponseDto[];
}
