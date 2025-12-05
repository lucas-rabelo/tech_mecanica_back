import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber } from 'class-validator';
import { ReadUserResponseDto } from './read-user-response.dto';

export class ListUserResponseDto {
  @ApiProperty()
  @IsNumber()
  total: number;

  @ApiProperty({ type: [ReadUserResponseDto] })
  @IsArray()
  users: ReadUserResponseDto[];
}
