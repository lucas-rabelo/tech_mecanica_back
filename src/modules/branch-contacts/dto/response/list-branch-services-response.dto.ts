import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber } from 'class-validator';
import { ReadBranchContactResponseDto } from './read-branch-services-response.dto';

export class ListBranchContactResponseDto {
  @ApiProperty()
  @IsNumber()
  total: number;

  @ApiProperty({ type: [ReadBranchContactResponseDto] })
  @IsArray()
  branchContacts: ReadBranchContactResponseDto[];
}
