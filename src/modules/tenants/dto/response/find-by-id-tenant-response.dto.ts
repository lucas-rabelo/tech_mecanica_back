import { CreateBranchResponseDto } from "@/src/modules/branches";
import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNumber, IsString } from "class-validator";

export class FindByIdTenantResponseDto {
  @ApiProperty()
  @IsNumber()
  id: number;

  @ApiProperty()
  @IsString()
  name: string;
  
  @ApiProperty()
  @IsString()
  status: string;
  
  @ApiProperty({ type: [CreateBranchResponseDto] })
  @IsArray()
  branches: CreateBranchResponseDto[];
  
  @ApiProperty()
  @IsString()
  createdAt: string;
  
  @ApiProperty({ nullable: true })
  @IsString()
  updatedAt?: string | null;
}
