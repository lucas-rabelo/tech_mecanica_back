import type { ListOptionsSelectResponseDto } from "@/src/infra";
import type { ListOptionsSelectRequestDto } from "../../dtos";
import { transformEnumInArray } from "../../utils";

export class ListOptionsSelectUseCase {
  execute(request: ListOptionsSelectRequestDto): ListOptionsSelectResponseDto {
    const { type } = request;

    const options = transformEnumInArray(type);

    return { options };
  }
}