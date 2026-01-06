import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsEmail, IsNumber, IsString } from "class-validator";
import { ReadUserStatusResponseDto } from "../../../user-status";

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

  @ApiProperty({ type: ReadUserStatusResponseDto })
  userStatus: ReadUserStatusResponseDto;

  @ApiProperty()
  @IsDateString()
  createdAt: string;

  @ApiProperty({ required: false, nullable: true })
  @IsDateString()
  updatedAt: string | null;
}
