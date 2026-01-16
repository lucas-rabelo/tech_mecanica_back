import {
  InventoryMovementReason,
  InventoryMovementReferenceType,
  InventoryMovementType,
  type InventoryMovementReasonEnum,
  type InventoryMovementReferenceTypeEnum,
  type InventoryMovementTypeEnum,
} from '@/src/core';
import { ListItemsRequestDto } from '@/src/infra';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsOptional } from 'class-validator';

export class FilterListInventoryMovementsRequestDto extends ListItemsRequestDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  stockItemId?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsEnum(InventoryMovementType)
  type?: InventoryMovementTypeEnum;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsEnum(InventoryMovementReason)
  reason?: InventoryMovementReasonEnum;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsEnum(InventoryMovementReferenceType)
  referenceType?: InventoryMovementReferenceTypeEnum;
}
