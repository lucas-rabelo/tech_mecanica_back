import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class ComparePasswordAuthService {
  constructor() {}

  async execute(newPassword: string, oldPassword: string) {
    return bcrypt.compare(newPassword, oldPassword);
  }
}
