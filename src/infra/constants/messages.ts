import { MessageType, MethodType } from "./enums";

export const HttpMessages = {
  [MessageType.SUCCESS]: {
    [MethodType.CREATE]: (moduleName: string) => `${moduleName} created successfully.`,
    [MethodType.UPDATE]: (moduleName: string) => `${moduleName} updated successfully.`,
    [MethodType.DELETE]: (moduleName: string) => `${moduleName} deleted successfully.`,
  },
  [MessageType.BAD_REQUEST]: {
    [MethodType.CREATE]: (moduleName: string, reason: string) => `Cannot create ${moduleName} ${reason}`,
    [MethodType.UPDATE]: (moduleName: string, reason: string) => `Cannot update ${moduleName} ${reason}`,
    [MethodType.DELETE]: (moduleName: string) => `Cannot delete ${moduleName} because it is in use.`,
  },
  [MessageType.NOT_FOUND]: {
    [MethodType.FIND]: (moduleName: string) => `${moduleName} not found.`,
    [MethodType.UPDATE]: (moduleName: string) => `${moduleName} not found for update.`,
    [MethodType.DELETE]: (moduleName: string) => `${moduleName} not found for deletion.`,
  },
  [MessageType.CONFLICT]: {
    [MethodType.CREATE]: (moduleName: string) => `${moduleName} already exists.`,
    [MethodType.UPDATE]: (moduleName: string) => `Another ${moduleName} with the same identifier already exists.`,
  },
}