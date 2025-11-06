import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class CreateBranchContactRequestDto {
  @ApiProperty()
  @IsString()
  price: number;

  @ApiProperty()
  @IsNumber()
  branchId: number;

  @ApiProperty()
  @IsNumber()
  serviceId: number;
}