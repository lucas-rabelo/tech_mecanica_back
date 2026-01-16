import type {
  InventoryMovementReasonEnum,
  InventoryMovementReferenceTypeEnum,
  InventoryMovementTypeEnum,
} from '../types';
import {
  InventoryMovementReason,
  InventoryMovementReferenceType,
  InventoryMovementType,
} from './enum';

export const movementTypeLabels: Record<InventoryMovementTypeEnum, string> = {
  [InventoryMovementType.ENTRY]: 'Entry',
  [InventoryMovementType.EXIT]: 'Exit',
  [InventoryMovementType.ADJUSTMENT]: 'Adjustment',
  [InventoryMovementType.TRANSFER]: 'Transfer',
};

export const movementReasonLabels: Record<InventoryMovementReasonEnum, string> =
  {
    [InventoryMovementReason.INVENTORY]: 'Inventory',
    [InventoryMovementReason.PURCHASE]: 'Purchase',
    [InventoryMovementReason.SALE]: 'Sale',
    [InventoryMovementReason.SERVICE]: 'Service',
    [InventoryMovementReason.LOSS]: 'Loss',
    [InventoryMovementReason.RETURN]: 'Return',
  };

export const movementReferenceTypeLabels: Record<
  InventoryMovementReferenceTypeEnum,
  string
> = {
  [InventoryMovementReferenceType.INVENTORY]: 'Inventory',
  [InventoryMovementReferenceType.OS]: 'OS',
  [InventoryMovementReferenceType.MANUAL]: 'Manual',
  [InventoryMovementReferenceType.PURCHASE]: 'Purchase',
};
