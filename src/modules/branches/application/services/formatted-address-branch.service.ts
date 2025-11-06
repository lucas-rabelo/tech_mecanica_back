import { Injectable } from "@nestjs/common";
import { CreateBranchResponseDto } from "../../dto";

@Injectable()
export class FormattedAddressBranchService {
  constructor() {}

  execute(data: CreateBranchResponseDto) {
    const { address, city, number, neighborhood, uf, zipCode } = data;

    const addressFormatted = `${address}, ${number} - ${neighborhood}, ${city}, ${uf} - CEP: ${zipCode}`;

    return addressFormatted;
  }
}