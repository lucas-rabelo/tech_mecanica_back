import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class UpdateTenantsRequestDto {
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
