import { FilterListUserRequestDto } from '../../../dtos';

export interface IListUserUseCaseRequest {
  isAdmin: boolean;
  tenantId: number;
  request: FilterListUserRequestDto;
}
