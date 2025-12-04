import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsEmail, IsNumber, IsOptional, IsString } from "class-validator";
import { ReadUserStatusResponseDto } from "../../../user-status";
import { ReadPermissionResponseDto } from "../../../permissions";
import { ReadTenantsResponseDto } from "../../../tenants";

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

  @ApiProperty({ type: ReadTenantsResponseDto, nullable: true })
  tenant: ReadTenantsResponseDto | null;

  @ApiProperty({ type: ReadPermissionResponseDto, nullable: true })
  permission: ReadPermissionResponseDto | null;

  @ApiProperty({ type: ReadUserStatusResponseDto })
  userStatus: ReadUserStatusResponseDto;

  @ApiProperty()
  @IsDateString()
  createdAt: string;

  @ApiProperty({ required: false, nullable: true })
  @IsDateString()
  updatedAt: string | null;
}
