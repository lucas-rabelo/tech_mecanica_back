import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber } from 'class-validator';
import { ReadUserStatusResponseDto } from './read-user-status-response.dto';

export class ListUserStatusResponseDto {
  @ApiProperty({ example: 10 })
  @IsNumber()
  total: number;

  @ApiProperty({ type: [ReadUserStatusResponseDto] })
  @IsArray()
  userStatus: ReadUserStatusResponseDto[];
}
