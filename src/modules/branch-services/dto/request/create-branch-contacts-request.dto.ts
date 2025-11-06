import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class CreateBranchContactRequestDto {
  @ApiProperty()
  @IsString()
  phone: number;

  @ApiProperty()
  @IsNumber()
  branchId: number;

  @ApiProperty()
  @IsNumber()
  isWhatsapp: number;
}