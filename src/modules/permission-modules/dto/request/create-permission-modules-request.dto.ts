import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";

export class CreatePermissionModulesRequestDto {
  @ApiProperty()
  @IsNumber()
  permissionId: number;
  
  @ApiProperty()
  @IsNumber()
  moduleId: number;
}