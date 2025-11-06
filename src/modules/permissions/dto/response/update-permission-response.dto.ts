import { ApiProperty } from "@nestjs/swagger";

export class UpdatePermissionResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;
}
