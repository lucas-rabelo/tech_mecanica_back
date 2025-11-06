import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber } from 'class-validator';
import { ReadBranchServiceResponseDto } from './read-branch-services-response.dto';

export class ListBranchServiceResponseDto {
  @ApiProperty()
  @IsNumber()
  total: number;

  @ApiProperty({ type: [ReadBranchServiceResponseDto] })
  @IsArray()
  branchServices: ReadBranchServiceResponseDto[];
}
