import { ApiProperty } from "@nestjs/swagger";
import { IsEmail } from "class-validator";

export class ForgotPasswordAuthRequestDto {
  @ApiProperty()
  @IsEmail()
  email: string;
}