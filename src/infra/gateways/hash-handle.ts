import { Hasher } from '@/domain/contracts/gateways';

import { Injectable } from '@nestjs/common';
import { hash, compare } from 'bcrypt';

@Injectable()
export class Hash implements Hasher {
  private readonly salt = 12;
  async hash(input: Hasher.Input): Promise<string> {
    return await hash(input.value, this.salt);
  }

  async compare(input: Hasher.CompareParams): Promise<boolean> {
    return await compare(input.value, input.hash);
  }
}
