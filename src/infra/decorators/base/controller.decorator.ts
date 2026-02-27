import { applyDecorators, Controller } from "@nestjs/common";
import { ApiTags, ApiBearerAuth, ApiBadRequestResponse, ApiUnauthorizedResponse, ApiInternalServerErrorResponse } from "@nestjs/swagger";
import { ErrorBadRequestResponseDto } from "../../docs";

export function AppController(prefix: string) {
  return applyDecorators(
    ApiTags(prefix),
    Controller(prefix.toLowerCase()),
    ApiBearerAuth(),
    ApiBadRequestResponse({ type: ErrorBadRequestResponseDto }),
    ApiUnauthorizedResponse({ type: ErrorBadRequestResponseDto }),
    ApiInternalServerErrorResponse({ type: ErrorBadRequestResponseDto }),
  )
}