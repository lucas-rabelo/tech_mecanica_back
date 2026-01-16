import { type IdentifyAuthNextStepEnum, IdentifyAuthNextStep, IdentifyAuthScope, IdentifyAuthScopeEnum } from '@/src/core';
import { PickType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsEnum, IsOptional } from 'class-validator';
import { ReadTenantsResponseDto } from '../../../tenants';

class TenantsSelectDto extends PickType(ReadTenantsResponseDto, [
  'id',
  'name',
]) {}

export class IdentifyAuthResponseDto {
  @ApiProperty({ enum: IdentifyAuthNextStep })
  @IsEnum(IdentifyAuthNextStep)
  nextStep: IdentifyAuthNextStepEnum;

  @ApiProperty({ type: [TenantsSelectDto], nullable: true, required: false })
  @IsOptional()
  @IsArray()
  tenants: TenantsSelectDto[] | null;
  
  @ApiProperty({ enum: IdentifyAuthScope, nullable: true, required: false })
  @IsOptional()
  @IsEnum(IdentifyAuthScope)
  scope: IdentifyAuthScopeEnum | null;
}
