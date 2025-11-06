import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, IsStrongPassword } from "class-validator";

export class RegisterUserAuthRequestDto {
  @ApiProperty()
  @IsString()
  name: string;
  
  @ApiProperty()
  @IsString()
  birthDate: string;
  
  @ApiProperty()
  @IsString()
  phone: string;
  
  @ApiProperty()
  @IsString()
  document: string;
  
  @ApiProperty()
  @IsEmail()
  email: string;
  
  @ApiProperty()
  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minSymbols: 1,
    minUppercase: 1,
    minNumbers: 1,
  })
  password: string;
  
  @ApiProperty()
  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minSymbols: 1,
    minUppercase: 1,
    minNumbers: 1,
  })
  confirmPassword: string;
}