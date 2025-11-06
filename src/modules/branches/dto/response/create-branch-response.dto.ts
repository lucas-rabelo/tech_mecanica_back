import { ReadBranchServiceResponseDto } from '@/src/modules/branch-services';
import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsBoolean, IsNumber, IsString } from 'class-validator';

export class CreateBranchResponseDto {
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

  @ApiProperty()
  @IsString()
  neighborhood: string;

  @ApiProperty()
  @IsString()
  city: string;

  @ApiProperty()
  @IsString()
  uf: string;

  @ApiProperty()
  @IsString()
  number: string;

  @ApiProperty()
  @IsString()
  zipCode: string;

  @ApiProperty({ type: [ReadBranchServiceResponseDto] })
  @IsArray()
  services: ReadBranchServiceResponseDto[];
}
