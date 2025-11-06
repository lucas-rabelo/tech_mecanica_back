import { ListItemsRequestDto } from "@/src/infra";
import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNumber, IsOptional } from "class-validator";

export class ListBranchServiceRequestDto extends ListItemsRequestDto {
  @ApiProperty({ required: false })
  @Type(() => Number)
  @IsOptional()
  @IsNumber()
  branchId?: number;

  @ApiProperty({ required: false })
  @Type(() => Number)
  @IsOptional()
  @IsNumber()
  serviceId?: number;
}