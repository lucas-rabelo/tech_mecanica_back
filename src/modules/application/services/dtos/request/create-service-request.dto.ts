import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateServiceRequestDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty({ nullable: true })
  @IsNumber({ maxDecimalPlaces: 2 })
  @IsOptional()
  price?: number;
}
