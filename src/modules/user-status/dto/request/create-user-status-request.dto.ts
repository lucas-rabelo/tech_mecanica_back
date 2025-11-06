import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class CreateUserStatusRequestDto {
  @ApiProperty()
  @IsString()
  @MinLength(4)
  name: string;
}
