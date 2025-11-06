import { Injectable } from "@nestjs/common";
import * as bcrypt from 'bcrypt';

@Injectable()
export class EncryptPasswordAuthService {
  constructor() {}

  async execute(password: string) {
    const passwordEncrypted = await bcrypt.hash(password, await bcrypt.genSalt());

    return passwordEncrypted;
  }
}