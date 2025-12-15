import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateVehicleRequestDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  licensePlate?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  brand?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  model?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  year?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  color?: string;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  currentMileage?: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  customerId?: number;
}
