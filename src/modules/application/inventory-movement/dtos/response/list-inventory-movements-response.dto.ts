import { ApiProperty } from "@nestjs/swagger";
import { ReadInventoryMovementResponseDto } from "./read-inventory-movement-response.dto";
import { IsArray, IsNumber } from "class-validator";

export class ListInventoryMovementsResponseDto {
  @ApiProperty()
  @IsNumber()
  total: number;

  @ApiProperty({ type: [ReadInventoryMovementResponseDto] })
  @IsArray()
  inventoryMovements: ReadInventoryMovementResponseDto[];
}