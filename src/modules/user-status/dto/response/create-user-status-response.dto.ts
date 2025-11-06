import { ApiProperty } from "@nestjs/swagger";

export class CreateUserStatusResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;
}