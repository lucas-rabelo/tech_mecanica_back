import { ApiProperty } from "@nestjs/swagger";

export class ReadPermissionResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;
}
