import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class ReadPermissionPagesResponseDto {
  @ApiProperty()
  @IsNumber()
  id: number;
  
  @ApiProperty()
  @IsString()
  permission: string;

  @ApiProperty()
  @IsString()
  page: string;
}