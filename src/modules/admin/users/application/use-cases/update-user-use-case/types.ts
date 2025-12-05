import { CreateUserRequestDto } from "../../../dtos";

export interface IUpdateUserUseCaseRequest {
  id: number;
  isAdmin: boolean;
  tenantId: number;
  request: CreateUserRequestDto;
}