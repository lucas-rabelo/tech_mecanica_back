import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsEmail, IsNumber, IsOptional, IsString } from "class-validator";

export class ReadUserResponseDto {
  @ApiProperty()
  @IsNumber()
  id: number;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsDateString()
  birthDate: Date;

  @ApiProperty()
  @IsString()
  phone: string;

  @ApiProperty()
  @IsString()
  document: string;

  @ApiProperty()
  @IsString()
  tenant: string;

  @ApiProperty()
  @IsString()
  permission: string;

  @ApiProperty()
  @IsString()
  userStatus: string;

  @ApiProperty()
  @IsDateString()
  createdAt: string;

  @ApiProperty({ required: false, nullable: true })
  @IsDateString()
  updatedAt: string | null;
}
