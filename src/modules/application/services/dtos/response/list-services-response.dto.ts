import { ApiProperty } from "@nestjs/swagger";
import { ReadServiceResponseDto } from "./read-service-response.dto";
import { IsArray, IsNumber } from "class-validator";

export class ListServicesResponseDto {
  @ApiProperty()
  @IsNumber()
  total: number;

  @ApiProperty({ type: [ReadServiceResponseDto] })
  @IsArray()
  services: ReadServiceResponseDto[];
}