export const CustomerType = {
  PF: "PF",
  PJ: "PJ",
} as const;

export const InventoryMovementType = {
  ENTRY: "ENTRY",
  EXIT: "EXIT",
  ADJUSTMENT: "ADJUSTMENT",
  TRANSFER: "TRANSFER",
} as const;

export const InventoryMovementReason = {
  PURCHASE: "PURCHASE",
  SALE: "SALE",
  SERVICE: "SERVICE",
  LOSS: "LOSS",
  INVENTORY: "INVENTORY",
  RETURN: "RETURN"
} as const;

export const InventoryMovementReferenceType = {
  OS: "OS",
  MANUAL: "MANUAL",
  INVENTORY: "INVENTORY",
  PURCHASE: "PURCHASE",
} as const;

export const IdentifyAuthNextStep = {
  PASSWORD: "PASSWORD",
  SELECT_TENANT: "SELECT_TENANT",
} as const;

export const IdentifyAuthScope = {
  ADMIN: "ADMIN",
  SUPPORT: "SUPPORT",
  USER: "USER",
} as const;
