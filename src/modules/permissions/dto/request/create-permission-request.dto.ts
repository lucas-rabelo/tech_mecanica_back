import { ApiProperty } from "@nestjs/swagger";
import { IsString, MinLength } from "class-validator";

export class CreatePermissionRequestDto {
  @ApiProperty()
  @IsString()
  @MinLength(4)
  name: string;
}