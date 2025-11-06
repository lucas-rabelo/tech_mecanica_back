import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class UpdatePermissionRequestDto {
  @ApiProperty()
  @MinLength(4)
  @IsString()
  name: string;
}
