import type { AppMethodDecoratorOptions } from "@/src/infra/types/decorators";
import { applyDecorators, Delete } from "@nestjs/common";
import { ApiOkResponse, ApiOperation } from "@nestjs/swagger";
import { RequireAccess } from "../required-access.decorator";

export function AppDelete(options: AppMethodDecoratorOptions) {
  const { requiredAccess, summary, okResponse, path } = options;

  return applyDecorators(
    Delete(path),
    RequireAccess(requiredAccess),
    ApiOperation({ summary }),
    ApiOkResponse({ type: okResponse }),
  )
}