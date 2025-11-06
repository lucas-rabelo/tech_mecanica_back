import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class CreateTenantStatusRequestDto {
  @ApiProperty()
  @IsString()
  @MinLength(4)
  name: string;
}
