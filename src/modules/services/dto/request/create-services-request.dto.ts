import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString, MinLength } from "class-validator";

export class CreateServiceRequestDto {
  @ApiProperty()
  @IsString()
  @MinLength(4)
  name: string;
  
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @MinLength(4)
  description?: string;
}