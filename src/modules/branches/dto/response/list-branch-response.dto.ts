import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNumber } from "class-validator";
import { ReadBranchResponseDto } from "./read-branch-response.dto";

export class ListBranchResponseDto {
  @ApiProperty()
  @IsNumber()
  total: number;
  
  @ApiProperty({ type: [ReadBranchResponseDto] })
  @IsArray()
  branches: ReadBranchResponseDto[]
}