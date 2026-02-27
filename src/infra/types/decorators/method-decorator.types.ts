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