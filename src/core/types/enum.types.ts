import type {
  CustomerType,
  IdentifyAuthNextStep,
  IdentifyAuthScope,
  InventoryMovementReason,
  InventoryMovementReferenceType,
  InventoryMovementType,
} from '../constants';

export type IdentifyAuthNextStepEnum =
  (typeof IdentifyAuthNextStep)[keyof typeof IdentifyAuthNextStep];

export type IdentifyAuthScopeEnum =
  (typeof IdentifyAuthScope)[keyof typeof IdentifyAuthScope];

export type InventoryMovementReasonEnum =
  (typeof InventoryMovementReason)[keyof typeof InventoryMovementReason];

export type InventoryMovementReferenceTypeEnum =
  (typeof InventoryMovementReferenceType)[keyof typeof InventoryMovementReferenceType];

export type InventoryMovementTypeEnum =
  (typeof InventoryMovementType)[keyof typeof InventoryMovementType];

export type CustomerTypeEnum = (typeof CustomerType)[keyof typeof CustomerType];
