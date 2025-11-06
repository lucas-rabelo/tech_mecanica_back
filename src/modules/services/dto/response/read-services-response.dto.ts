import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class ReadServiceResponseDto {
  @ApiProperty({ nullable: true })
  @IsNumber()
  id: number;

  @ApiProperty({ nullable: true })
  @IsString()
  name: string;

  @ApiProperty({ nullable: true })
  @IsString()
  description: string | null;
}
