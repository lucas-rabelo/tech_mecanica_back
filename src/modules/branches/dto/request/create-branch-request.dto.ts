import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNumber, IsString, MinLength } from "class-validator";

export class CreateBranchRequestDto {
  @ApiProperty()
  @IsString()
  @MinLength(4)
  name: string;

  @ApiProperty()
  @IsString()
  address: string;

  @ApiProperty()
  @IsString()
  number: string;

  @ApiProperty()
  @IsString()
  @MinLength(10)
  phone: string;

  @ApiProperty()
  @IsString()
  neighborhood: string;

  @ApiProperty()
  @IsString()
  city: string;

  @ApiProperty()
  @IsString()
  uf: string;

  @ApiProperty()
  @IsString()
  zipCode: string;

  @ApiProperty()
  @IsBoolean()
  isWhatsapp: boolean;

  @ApiProperty()
  @IsBoolean()
  isMain: boolean;

  @ApiProperty()
  @IsNumber()
  tenantId: number;
}