import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateModuleRequestDto {
  @ApiProperty()
  @IsString()
  name: string;
}
