import { ListItemsRequestDto } from "@/src/infra";
import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNumber, IsOptional } from "class-validator";

export class ListPermissionModulesRequestDto extends ListItemsRequestDto {
  @ApiProperty({ required: false })
  @Type(() => Number)
  @IsOptional()
  @IsNumber()
  permissionId?: number;
  
  @ApiProperty({ required: false })
  @Type(() => Number)
  @IsOptional()
  @IsNumber()
  moduleId?: number;
}