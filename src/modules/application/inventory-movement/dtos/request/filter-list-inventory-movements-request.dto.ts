import {
  InventoryMovementReasonEnum,
  InventoryMovementReferenceTypeEnum,
  InventoryMovementTypeEnum,
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
  @IsEnum(InventoryMovementTypeEnum)
  type?: InventoryMovementTypeEnum;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsEnum(InventoryMovementReasonEnum)
  reason?: InventoryMovementReasonEnum;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsEnum(InventoryMovementReferenceTypeEnum)
  referenceType?: InventoryMovementReferenceTypeEnum;
}
