import { ApiProperty } from "@nestjs/swagger";
import { IsEmail } from "class-validator";

export class ForgetPasswordAuthRequestDto {
  @ApiProperty()
  @IsEmail()
  email: string;
}