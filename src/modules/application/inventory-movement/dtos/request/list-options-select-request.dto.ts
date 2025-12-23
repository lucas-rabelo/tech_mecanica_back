import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class ListOptionsSelectRequestDto {
  @ApiProperty()
  @IsString()
  type: string;
}