import { FindUserAuthResponseDto } from "@/src/modules";

export interface IUserDecorator {
  isAdmin: boolean;
  tenantId: number;
  user: FindUserAuthResponseDto;
  token: string;
}