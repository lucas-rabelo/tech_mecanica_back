import type { AppMethodDecoratorOptions } from "@/src/infra/types/decorators";
import { applyDecorators, Post } from "@nestjs/common";
import { RequireAccess } from "../required-access.decorator";
import { ApiOkResponse, ApiOperation } from "@nestjs/swagger";

export function AppPost(options: AppMethodDecoratorOptions) {
  const { requiredAccess, summary, okResponse, path } = options;
  
  return applyDecorators(
    Post(path),
    RequireAccess(requiredAccess),
    ApiOperation({ summary }),
    ApiOkResponse({ type: okResponse }),
  )
}