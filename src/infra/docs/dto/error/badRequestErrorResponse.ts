import { ApiProperty } from "@nestjs/swagger";

class ErrorDto {
  @ApiProperty()
  message: string;
}

export class ErrorBadRequestResponseDto {
  @ApiProperty()
  status: number;

  @ApiProperty({ type: ErrorDto })
  data: ErrorDto;
}