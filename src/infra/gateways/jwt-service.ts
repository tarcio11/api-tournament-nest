import { JwtServiceAbstract } from '@/domain/contracts/gateways/jwt-service';
import { Injectable } from '@nestjs/common';
import { sign, verify } from 'jsonwebtoken';

@Injectable()
export class JwtService implements JwtServiceAbstract {
  sign(plaintext: string): string {
    return sign({ id: plaintext }, 'secret', { expiresIn: '1d' });
  }

  verify = async (ciphertext: string): Promise<string> => {
    return verify(ciphertext, 'secret') as string;
  };
}
