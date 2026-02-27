import type { Type } from "@nestjs/common";

interface RequiredAccessType {
  module: string;
  page: string;
}

export interface AppMethodDecoratorOptions {
  path?: string;
  requiredAccess: RequiredAccessType;
  summary: string;
  okResponse: Function;
}