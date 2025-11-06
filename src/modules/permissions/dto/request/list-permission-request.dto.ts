import { ListItemsRequestDto } from "@/src/infra";
import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class ListPermissionRequestDto extends ListItemsRequestDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  name?: string
}