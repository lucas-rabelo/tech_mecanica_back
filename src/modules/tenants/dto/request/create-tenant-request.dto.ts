import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, MinLength } from 'class-validator';

export class CreateTenantRequestDto {
  @ApiProperty()
  @IsString()
  @MinLength(4)
  name: string;

  @ApiProperty()
  @IsNumber()
  tenantStatusId: number;
}
