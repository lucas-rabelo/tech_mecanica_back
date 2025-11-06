import { ListItemsRequestDto } from '@/src/infra';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class ListServicesRequestDto extends ListItemsRequestDto {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  name?: string;
}
