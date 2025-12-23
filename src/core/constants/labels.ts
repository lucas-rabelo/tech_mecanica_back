import {
  InventoryMovementReasonEnum,
  InventoryMovementReferenceTypeEnum,
  InventoryMovementTypeEnum,
} from './enum';

export const movementTypeLabels: Record<InventoryMovementTypeEnum, string> = {
  [InventoryMovementTypeEnum.ENTRY]: 'Entry',
  [InventoryMovementTypeEnum.EXIT]: 'Exit',
  [InventoryMovementTypeEnum.ADJUSTMENT]: 'Adjustment',
  [InventoryMovementTypeEnum.TRANSFER]: 'Transfer',
};

export const movementReasonLabels: Record<InventoryMovementReasonEnum, string> =
  {
    [InventoryMovementReasonEnum.INVENTORY]: 'Inventory',
    [InventoryMovementReasonEnum.PURCHASE]: 'Purchase',
    [InventoryMovementReasonEnum.SALE]: 'Sale',
    [InventoryMovementReasonEnum.SERVICE]: 'Service',
    [InventoryMovementReasonEnum.LOSS]: 'Loss',
    [InventoryMovementReasonEnum.RETURN]: 'Return',
  };

export const movementReferenceTypeLabels: Record<
  InventoryMovementReferenceTypeEnum,
  string
> = {
  [InventoryMovementReferenceTypeEnum.INVENTORY]: 'Inventory',
  [InventoryMovementReferenceTypeEnum.OS]: 'OS',
  [InventoryMovementReferenceTypeEnum.MANUAL]: 'Manual',
  [InventoryMovementReferenceTypeEnum.PURCHASE]: 'Purchase',
};
