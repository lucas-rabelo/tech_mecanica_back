import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString, MinLength } from "class-validator";

export class CreatePageRequestDto {
  @ApiProperty()
  @IsString()
  @MinLength(4)
  name: string;
  
  @ApiProperty()
  @IsNumber()
  moduleId: number;
}