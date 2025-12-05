export interface IDeleteUserUseCaseRequest {
  id: number;
  isAdmin: boolean;
  tenantId: number;
}