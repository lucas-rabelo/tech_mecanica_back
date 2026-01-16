import {
  InventoryMovementReason,
  InventoryMovementReferenceType,
  InventoryMovementType,
  movementReasonLabels,
  movementReferenceTypeLabels,
  movementTypeLabels,
} from '@/src/core/constants';
import type { OptionsSelectResponseDto } from '@/src/infra';

export function transformEnumInArray(
  enumObj: string,
): OptionsSelectResponseDto[] {
  const typeEnum: Record<string, Object> = {
    type: InventoryMovementType,
    reason: InventoryMovementReason,
    referenceType: InventoryMovementReferenceType,
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
