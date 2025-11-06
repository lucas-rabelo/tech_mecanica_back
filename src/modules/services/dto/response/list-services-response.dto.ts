import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNumber } from "class-validator";
import { ReadServiceResponseDto } from "./read-services-response.dto";

export class ListServicesResponseDto {
  @ApiProperty()
  @IsNumber()
  total: number;

  @ApiProperty({ type: [ReadServiceResponseDto] })
  @IsArray()
  services: ReadServiceResponseDto[];
}