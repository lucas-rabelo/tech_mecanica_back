import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional } from "class-validator";

export class TenantIdRequestDto {
  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  tenantId?: number;
}