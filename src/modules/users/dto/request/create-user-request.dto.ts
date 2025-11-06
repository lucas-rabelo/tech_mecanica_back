import { TenantIdRequestDto } from '@/src/infra';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNumber,
  IsString,
  IsStrongPassword,
  MinLength,
} from 'class-validator';

export class CreateUserRequestDto extends TenantIdRequestDto {
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  @MinLength(4)
  name: string;

  @ApiProperty()
  @IsString()
  birthDate: string;

  @ApiProperty()
  @IsString()
  phone: string;

  @ApiProperty()
  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minSymbols: 1,
    minUppercase: 1,
    minNumbers: 1,
  })
  password: string;

  @ApiProperty()
  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minSymbols: 1,
    minUppercase: 1,
    minNumbers: 1,
  })
  confirmPassword: string;

  @ApiProperty()
  @IsString()
  @MinLength(11)
  document: string;

  @ApiProperty()
  @IsNumber()
  permissionId: number;

  @ApiProperty()
  @IsNumber()
  userStatusId: number;
}
