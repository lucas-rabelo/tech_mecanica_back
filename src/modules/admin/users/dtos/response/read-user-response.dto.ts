import { IdentifyAuthScope, type IdentifyAuthScopeEnum } from '@/src/core';
import { OmitType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsEmail, IsNumber, IsString } from 'class-validator';
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

export class ReadUserResponseDto {
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
  @IsDateString()
  birthDate: Date;

  @ApiProperty()
  @IsString()
  phone: string;

  @ApiProperty()
  @IsString()
  document: string;

  @ApiProperty({ enum: IdentifyAuthScope })
  typeUser: IdentifyAuthScopeEnum;

  @ApiProperty({ type: ReadUserStatusResponseDto })
  userStatus: ReadUserStatusResponseDto;

  @ApiProperty({ type: [UserTenantResponseDto] })
  userTenants: UserTenantResponseDto[];

  @ApiProperty()
  @IsDateString()
  createdAt: string;

  @ApiProperty({ required: false, nullable: true })
  @IsDateString()
  updatedAt: string | null;
}
