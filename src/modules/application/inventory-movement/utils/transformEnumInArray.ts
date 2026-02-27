import {
  InventoryMovementReasonEnum,
  InventoryMovementReferenceTypeEnum,
  InventoryMovementTypeEnum,
} from '@/src/core';
import {
  movementReasonLabels,
  movementReferenceTypeLabels,
  movementTypeLabels,
} from '@/src/core/constants';
import { OptionsSelectResponseDto } from '@/src/infra';

export function transformEnumInArray(enumObj: string): OptionsSelectResponseDto[] {
  const typeEnum: Record<string, Object> = {
    type: InventoryMovementTypeEnum,
    reason: InventoryMovementReasonEnum,
    referenceType: InventoryMovementReferenceTypeEnum,
  };

  const labels: Record<string, Record<string, string>> = {
    type: movementTypeLabels,
    reason: movementReasonLabels,
    referenceType: movementReferenceTypeLabels,
  };

  const options = Object.values(typeEnum[enumObj]).map((value) => ({
    value: value.toString(),
    label: labels[enumObj][value.toString()],
  }));

  return options;
}
