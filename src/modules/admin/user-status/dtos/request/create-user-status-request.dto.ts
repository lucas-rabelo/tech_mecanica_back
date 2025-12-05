import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateUserStatusRequestDto {
  @ApiProperty()
  @IsString()
  name: string;
}
