export enum CustomerTypeEnum {
  PF = "PF",
  PJ = "PJ",
};

export enum InventoryMovementTypeEnum {
  ENTRY = "ENTRY",
  EXIT = "EXIT",
  ADJUSTMENT = "ADJUSTMENT",
  TRANSFER = "TRANSFER",
}

export enum InventoryMovementReasonEnum {
  PURCHASE = "PURCHASE",
  SALE = "SALE",
  SERVICE = "SERVICE",
  LOSS = "LOSS",
  INVENTORY = "INVENTORY",
  RETURN = "RETURN"
}

export enum InventoryMovementReferenceTypeEnum {
  OS = "OS",
  MANUAL = "MANUAL",
  INVENTORY = "INVENTORY",
  PURCHASE = "PURCHASE",
}

export const IdentifyAuthNextStep = {
  PASSWORD: "PASSWORD",
  SELECT_TENANT: "SELECT_TENANT",
} as const;

export type IdentifyAuthNextStepEnum =
  typeof IdentifyAuthNextStep[keyof typeof IdentifyAuthNextStep];

export const IdentifyAuthScope = {
  ADMIN: "ADMIN",
  SUPPORT: "SUPPORT",
  USER: "USER",
} as const;

export type IdentifyAuthScopeEnum =
  typeof IdentifyAuthScope[keyof typeof IdentifyAuthScope];
