import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdateUserStatusRequestDto {
  @ApiProperty()
  @IsString()
  name: string;
}
