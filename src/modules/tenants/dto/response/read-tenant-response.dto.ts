import { ReadBranchResponseDto } from '@/src/modules/branches';
import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber, IsString } from 'class-validator';

export class ReadTenantResponseDto {
  @ApiProperty()
  @IsNumber()
  id: number;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty({ type: [ReadBranchResponseDto] })
  @IsArray()
  branches: ReadBranchResponseDto[];

  @ApiProperty()
  @IsString()
  status: string;

  @ApiProperty()
  @IsString()
  createdAt: string;

  @ApiProperty({ nullable: true })
  @IsString()
  updatedAt?: string | null;
}
