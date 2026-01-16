import { IdentifyAuthNextStep, IdentifyAuthNextStepEnum } from "@/src/core";
import { IdentifyAuthResponseDto } from "../dtos";

export const validationOfResponse: Record<
  IdentifyAuthNextStepEnum,
  IdentifyAuthResponseDto
> = {
  [IdentifyAuthNextStep.PASSWORD]: {
    nextStep: IdentifyAuthNextStep.PASSWORD,
    tenants: null,
    scope: null,
  },
  [IdentifyAuthNextStep.SELECT_TENANT]: {
    nextStep: IdentifyAuthNextStep.SELECT_TENANT,
    tenants: [],
    scope: null,
  },
};
