import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class CreateBranchContactRequestDto {
  @ApiProperty()
  @IsNumber()
  price: number;

  @ApiProperty()
  @IsNumber()
  branchId: number;

  @ApiProperty()
  @IsNumber()
  serviceId: number;
}
