import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional } from "class-validator";

export class FindByIdUserRequestDto {
  @ApiProperty()
  @IsNumber()
  id: number;

  @IsNumber()
  @IsOptional()
  tenantId: number | null;
}