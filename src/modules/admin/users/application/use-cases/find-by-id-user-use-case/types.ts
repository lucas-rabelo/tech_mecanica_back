export interface IFindByIdUserUseCaseRequest {
  id: number;
  isAdmin: boolean;
  tenantId: number | null;
}