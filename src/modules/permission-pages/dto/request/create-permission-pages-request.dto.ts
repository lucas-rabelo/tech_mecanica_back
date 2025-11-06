import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";

export class CreatePermissionPagesRequestDto {
  @ApiProperty()
  @IsNumber()
  permissionId: number;
  
  @ApiProperty()
  @IsNumber()
  pageId: number;
}