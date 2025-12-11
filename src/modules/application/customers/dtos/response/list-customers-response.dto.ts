import { ApiProperty } from "@nestjs/swagger";
import { ReadCustomerResponseDto } from "./read-customer-response.dto";
import { IsArray, IsNumber } from "class-validator";

export class ListCustomersResponseDto {
  @ApiProperty()
  @IsNumber()
  total: number;

  @ApiProperty({ type: [ReadCustomerResponseDto] })
  @IsArray()
  customers: ReadCustomerResponseDto[];
}