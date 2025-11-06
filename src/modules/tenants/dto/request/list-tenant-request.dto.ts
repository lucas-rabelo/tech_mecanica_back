import { ListItemsRequestDto } from '@/src/infra';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';

export class ListTenantRequestDto extends ListItemsRequestDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @Transform(({ value }) => {
    if (Array.isArray(value)) return value.map(Number).filter(v => !isNaN(v));

    if (typeof value === 'string') {
      return value
        .split(',')
        .map(v => Number(v.trim()))
        .filter(v => !isNaN(v));
    }

    return [];
  })
  @IsArray()
  @IsNumber({}, { each: true })
  tenantStatusId?: number[];
}
