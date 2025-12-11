import { CustomerTypeEnum } from '@/src/core';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDateString,
  IsEmail,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class ReadCustomerResponseDto {
  @ApiProperty()
  @IsNumber()
  id: number;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  phone: string;

  @ApiProperty()
  @IsString()
  document: string;

  @ApiProperty()
  @IsEnum(CustomerTypeEnum)
  customerType: CustomerTypeEnum;

  @ApiProperty()
  @IsBoolean()
  isWhatsapp: boolean;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  backupPhone?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  ownerBackupPhone?: string;

  @ApiProperty({ example: '2025-11-12T16:25:00.000Z' })
  @IsDateString()
  createdAt: string;

  @ApiProperty({ nullable: true, example: '2025-11-12T16:25:00.000Z' })
  @IsDateString()
  updatedAt: string | null;
}
