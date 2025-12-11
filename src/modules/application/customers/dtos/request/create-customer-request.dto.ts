import { CustomerTypeEnum } from '@/src/core';
import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEmail, IsEnum, IsOptional, IsString } from 'class-validator';

export class CreateCustomerRequestDto {
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
  
  @ApiProperty({ required: false, nullable: true })
  @IsOptional()
  @IsString()
  backupPhone: string | null;
  
  @ApiProperty({ required: false, nullable: true })
  @IsOptional()
  @IsString()
  ownerBackupPhone: string | null;
}
