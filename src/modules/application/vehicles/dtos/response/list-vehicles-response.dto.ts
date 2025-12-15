import { ApiProperty } from "@nestjs/swagger";
import { ReadVehicleResponseDto } from "./read-vehicle-response.dto";
import { IsArray, IsNumber } from "class-validator";

export class ListVehiclesResponseDto {
  @ApiProperty()
  @IsNumber()
  total: number;

  @ApiProperty({ type: [ReadVehicleResponseDto] })
  @IsArray()
  vehicles: ReadVehicleResponseDto[];
}