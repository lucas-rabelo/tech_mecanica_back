import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class CreateTenantResponseDto {
  @ApiProperty()
  @IsNumber()
  id: number;
  
  @ApiProperty()
  @IsString()
  name: string;
  
  @ApiProperty()
  @IsNumber()
  tenantStatusId: number;
}
