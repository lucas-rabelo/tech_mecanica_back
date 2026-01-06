import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class CreateUserTenantRequestDto {
  @ApiProperty()
  @IsNumber()
  userId: number;

  @ApiProperty()
  @IsNumber()
  tenantId: number;

  @ApiProperty()
  @IsNumber()
  permissionId: number;
}
