import { ReadUserResponseDto } from "@/src/modules/admin/users";
import { IsString } from "class-validator";

export class FindUserAuthResponseDto extends ReadUserResponseDto {
  @IsString()
  password: string;
}