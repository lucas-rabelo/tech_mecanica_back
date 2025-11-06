import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class ReadBranchServiceResponseDto {
  @ApiProperty()
  @IsNumber()
  id: number;

  @ApiProperty()
  @IsString()
  service: string;

  @ApiProperty()
  @IsString()
  branch: string;

  @ApiProperty({ nullable: true })
  @IsString()
  description: string | null;

  @ApiProperty({ nullable: true })
  @IsNumber()
  price: number | null;
}