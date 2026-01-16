import { CustomerType, type CustomerTypeEnum } from '@/src/core';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateCustomerRequestDto {
  @ApiProperty({ required: false, nullable: true, example: 'João Gomes' })
  @IsOptional()
  @IsString()
  name: string | null;

  @ApiProperty({ required: false, nullable: true, example: 'joao.gomes@email.com' })
  @IsOptional()
  @IsEmail()
  email: string | null;

  @ApiProperty({ required: false, nullable: true, example: '+5599999999999' })
  @IsOptional()
  @IsString()
  phone: string | null;

  @ApiProperty({ required: false, nullable: true, example: '99999999999' })
  @IsOptional()
  @IsString()
  document: string | null;

  @ApiProperty({ required: false, nullable: true, example: 'PF' })
  @IsOptional()
  @IsEnum(CustomerType)
  customerType: CustomerTypeEnum | null;

  @ApiProperty({ required: false, nullable: true, example: true })
  @IsOptional()
  @IsBoolean()
  isWhatsapp: boolean | null;

  @ApiProperty({ required: false, nullable: true, example: null })
  @IsOptional()
  @IsString()
  backupPhone: string | null;

  @ApiProperty({ required: false, nullable: true, example: null })
  @IsOptional()
  @IsString()
  ownerBackupPhone: string | null;
}
