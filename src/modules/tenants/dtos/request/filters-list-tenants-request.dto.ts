import { ListItemsRequestDto } from '@/src/infra';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class FiltersListTenantsRequestDto extends ListItemsRequestDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  name?: string;
  
  @ApiProperty()
  @IsOptional()
  @IsNumber()
  tenantStatusId?: number;
  
  @ApiProperty()
  @IsOptional()
  @IsString()
  subdomain?: string;
}
