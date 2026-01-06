import { ListItemsRequestDto } from '@/src/infra';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';

export class FilterListUserTenantRequestDto extends ListItemsRequestDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  userId?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  tenantId?: number;
  
  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  permissionId?: number;
}
