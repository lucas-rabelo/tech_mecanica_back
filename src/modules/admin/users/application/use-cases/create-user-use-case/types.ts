import { CreateUserRequestDto } from "../../../dtos";

export interface ICreateUserUseCaseRequest {
  isAdmin: boolean;
  tenantId: number;
  request: CreateUserRequestDto
}