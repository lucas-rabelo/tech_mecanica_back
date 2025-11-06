import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNumber, IsOptional, IsString, ValidateIf } from 'class-validator';

export class ReadUserResponseDto {
  @ApiProperty()
  @IsNumber()
  id: number;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  birthDate: string;

  @ApiProperty()
  @IsString()
  phone: string;

  @ApiProperty()
  @IsString()
  document: string;

  @ApiProperty()
  @IsString()
  permission: string;

  @ApiProperty()
  @IsNumber()
  permissionId: number;

  @ApiProperty()
  @IsString()
  @IsOptional()
  @ValidateIf((obj) => obj.tenant !== null && obj.tenant !== '')
  tenant?: string | null;

  @ApiProperty()
  @IsString()
  userStatus: string;
}
