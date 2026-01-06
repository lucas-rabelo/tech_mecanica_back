import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class IdentifyAuthRequestDto {
  @ApiProperty()
  @IsEmail()
  email: string;
}
