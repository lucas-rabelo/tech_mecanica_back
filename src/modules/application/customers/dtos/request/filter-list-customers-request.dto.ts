import { CustomerType, type CustomerTypeEnum } from '@/src/core';
import { ListItemsRequestDto } from '@/src/infra';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEmail, IsEnum, IsOptional, IsString } from 'class-validator';

export class FilterListCustomersRequestDto extends ListItemsRequestDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  document?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @Transform(({ value }) => ('' + value).toUpperCase())
  @IsEnum(CustomerType)
  customerType?: CustomerTypeEnum;
}
