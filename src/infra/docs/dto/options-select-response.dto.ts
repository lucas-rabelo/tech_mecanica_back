import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class OptionsSelectResponseDto {
  @ApiProperty()
  @IsString()
  value: string;
  
  @ApiProperty()
  @IsString()
  label: string;
}