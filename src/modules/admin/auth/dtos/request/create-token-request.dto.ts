import { IdentifyAuthScope, type IdentifyAuthScopeEnum } from '@/src/core';
import { OmitType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsEmail, IsNumber, IsOptional, IsString } from 'class-validator';
import { ReadUserStatusResponseDto } from '../../../user-status';
import { ReadUserTenantResponseDto } from '../../../user-tenants';

class TenantAndPermissionResponseDto {
  @ApiProperty()
  @IsNumber()
  id: number;

  @ApiProperty()
  @IsString()
  name: string;
}

class UserTenantResponseDto {
  @ApiProperty({ example: 1 })
  @IsNumber()
  id: number;

  @ApiProperty({ type: TenantAndPermissionResponseDto })
  permission: TenantAndPermissionResponseDto;

  @ApiProperty({ type: TenantAndPermissionResponseDto })
  tenant: TenantAndPermissionResponseDto;
}

export class CreateTokenRequestDto {
  @ApiProperty()
  @IsNumber()
  id: number;

  @ApiProperty({ nullable: true })
  @IsOptional()
  @IsNumber()
  tenantId?: number | null;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  document: string;

  @ApiProperty({ enum: IdentifyAuthScope })
  scope: IdentifyAuthScopeEnum;
}
