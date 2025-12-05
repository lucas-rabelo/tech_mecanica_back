import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateTenantsRequestDto {
  @ApiProperty()
  @IsString()
  name: string;
  
  @ApiProperty()
  @IsNumber()
  tenantStatusId: number;
  
  @ApiProperty()
  @IsString()
  subdomain: string;
}
