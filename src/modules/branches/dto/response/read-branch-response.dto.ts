import { ReadBranchServiceResponseDto } from '@/src/modules/branch-services';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, IsBoolean, IsArray } from 'class-validator';

export class ReadBranchResponseDto {
  @ApiProperty()
  @IsNumber()
  id: number;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  phone: string;

  @ApiProperty()
  @IsBoolean()
  isWhatsapp: boolean;

  @ApiProperty()
  @IsBoolean()
  isMain: boolean;

  @ApiProperty()
  @IsString()
  address: string;

  @ApiProperty({ type: [ReadBranchServiceResponseDto] })
  @IsArray()
  services: ReadBranchServiceResponseDto[];
}
