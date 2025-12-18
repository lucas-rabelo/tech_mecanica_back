import { ApiProperty } from "@nestjs/swagger";
import { ReadStockItemResponseDto } from "./read-stock-item-response.dto";
import { IsArray, IsNumber } from "class-validator";

export class ListStockItemsResponseDto {
  @ApiProperty()
  @IsNumber()
  total: number;

  @ApiProperty({ type: [ReadStockItemResponseDto] })
  @IsArray()
  stockItems: ReadStockItemResponseDto[];
}