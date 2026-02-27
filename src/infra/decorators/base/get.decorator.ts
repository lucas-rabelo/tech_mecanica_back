import type { AppMethodDecoratorOptions } from "@/src/infra/types/decorators";
import { applyDecorators, Get } from "@nestjs/common";
import { ApiOkResponse, ApiOperation } from "@nestjs/swagger";
import { RequireAccess } from "../required-access.decorator";

export function AppGet(options: AppMethodDecoratorOptions) {
  const { requiredAccess, summary, okResponse, path } = options;

  return applyDecorators(
    Get(path),
    RequireAccess(requiredAccess),
    ApiOperation({ summary }),
    ApiOkResponse({ type: okResponse }),
  )
}