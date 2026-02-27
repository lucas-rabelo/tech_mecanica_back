import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

class CreateModuleRequestDto {
  @ApiProperty()
  @IsString()
  name: string;
}

class CreateModuleUseCaseDto {
  @ApiProperty()
  @IsNumber()
  id: number;

  @ApiProperty({ type: CreateModuleRequestDto })
  data: CreateModuleRequestDto;
}

export { CreateModuleRequestDto, CreateModuleUseCaseDto };
