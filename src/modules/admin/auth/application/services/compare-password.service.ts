import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class ComparePasswordService {
  constructor() {}

  async execute(newPassword: string, oldPassword: string): Promise<boolean> {
    return bcrypt.compare(newPassword, oldPassword);
  }
}
