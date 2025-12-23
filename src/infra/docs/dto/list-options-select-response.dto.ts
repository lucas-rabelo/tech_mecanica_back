import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsString } from "class-validator";
import { OptionsSelectResponseDto } from "./options-select-response.dto";

export class ListOptionsSelectResponseDto {
  @ApiProperty({ type: [OptionsSelectResponseDto] })
  @IsArray()
  options: OptionsSelectResponseDto[];
}