import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsEmail,
  IsNumber,
  IsOptional,
  IsString,
  IsStrongPassword,
} from 'class-validator';

export class UpdateUserRequestDto {
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
  @IsDateString()
  birthDate?: Date;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minNumbers: 1,
    minSymbols: 1,
    minUppercase: 1,
  })
  password?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  confirmPassword?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  document?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  tenantId?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  permissionId?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  userStatusId?: number;
}
