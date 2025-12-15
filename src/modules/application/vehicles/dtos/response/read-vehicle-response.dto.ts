import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNumber, IsObject, IsString } from 'class-validator';
import { ReadCustomerResponseDto } from '../../../customers';

export class ReadVehicleResponseDto {
  @ApiProperty()
  @IsNumber()
  id: number;

  @ApiProperty()
  @IsString()
  licensePlate: string;

  @ApiProperty()
  @IsString()
  brand: string;

  @ApiProperty()
  @IsString()
  model: string;

  @ApiProperty()
  @IsString()
  year: string;

  @ApiProperty()
  @IsString()
  color: string;

  @ApiProperty()
  @IsNumber()
  currentMileage: number;

  @ApiProperty({ type: ReadCustomerResponseDto })
  @IsObject()
  customer: ReadCustomerResponseDto;

  @ApiProperty({ example: '2025-11-12T16:25:00.000Z' })
  @IsDateString()
  createdAt: string;

  @ApiProperty({ nullable: true, example: '2025-11-12T16:25:00.000Z' })
  @IsDateString()
  updatedAt: string | null;
}
