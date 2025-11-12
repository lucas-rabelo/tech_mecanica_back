import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean } from "class-validator";

export class DeletedAndUpdatedDataResponseDto {
  @ApiProperty()
  @IsBoolean()
  success: true;
}