import type { AppMethodDecoratorOptions } from "@/src/infra/types/decorators";
import { applyDecorators, Put } from "@nestjs/common";
import { ApiOkResponse, ApiOperation } from "@nestjs/swagger";
import { RequireAccess } from "../required-access.decorator";

export function AppPut(options: AppMethodDecoratorOptions) {
  const { requiredAccess, summary, okResponse, path } = options;

  return applyDecorators(
    Put(path),
    RequireAccess(requiredAccess),
    ApiOperation({ summary }),
    ApiOkResponse({ type: okResponse }),
  )
}