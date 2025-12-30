import { ApiProperty } from "@nestjs/swagger";
import { ReadServiceMaterialResponseDto } from "./read-service-material-response.dto";
import { IsArray, IsNumber } from "class-validator";

export class ListServiceMaterialsResponseDto {
  @ApiProperty()
  @IsNumber()
  total: number;

  @ApiProperty({ type: [ReadServiceMaterialResponseDto] })
  @IsArray()
  serviceMaterials: ReadServiceMaterialResponseDto[];
}