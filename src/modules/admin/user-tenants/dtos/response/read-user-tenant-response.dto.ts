import { IdentifyAuthScope, type IdentifyAuthScopeEnum } from '@/src/core';
import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsEmail, IsNumber, IsString } from 'class-validator';

class TenantResponseDto {
  @ApiProperty()
  @IsNumber()
  id: number;

  @ApiProperty()
  @IsString()
  name: string;
}

class PermissionResponseDto {
  @ApiProperty()
  @IsNumber()
  id: number;

  @ApiProperty()
  @IsString()
  name: string;
}

class UserResponseDto {
  @ApiProperty()
  @IsNumber()
  id: number;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty({ enum: IdentifyAuthScope })
  typeUser: IdentifyAuthScopeEnum;
}

export class ReadUserTenantResponseDto {
  @ApiProperty({ example: 1 })
  @IsNumber()
  id: number;

  @ApiProperty({ type: TenantResponseDto })
  tenant: TenantResponseDto;

  @ApiProperty({ type: PermissionResponseDto })
  permission: PermissionResponseDto;

  @ApiProperty({ type: UserResponseDto })
  user: UserResponseDto;

  @ApiProperty({ example: '2025-11-12T16:25:00.000Z' })
  @IsDateString()
  createdAt: string;

  @ApiProperty({ nullable: true, example: '2025-11-12T16:25:00.000Z' })
  @IsDateString()
  updatedAt: string | null;
}
