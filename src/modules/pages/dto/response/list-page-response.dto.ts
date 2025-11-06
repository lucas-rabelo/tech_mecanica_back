import { IsArray, IsNumber } from "class-validator";
import { ReadPageResponseDto } from "./read-page-response.dto";
import { ApiProperty } from "@nestjs/swagger";

export class ListPageResponseDto {
  @ApiProperty()
  @IsNumber()
  total: number;

  @ApiProperty({ type: [ReadPageResponseDto] })
  @IsArray()
  pages: ReadPageResponseDto[]
}