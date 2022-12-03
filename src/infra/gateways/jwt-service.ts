import { JwtServiceAbstract } from '@/domain/contracts/gateways/jwt-service';
import { Injectable } from '@nestjs/common';
import { JwtService as jwt } from '@nestjs/jwt';

@Injectable()
export class JwtService implements JwtServiceAbstract {
  constructor(private readonly jwtService: jwt) {}

  sign(plaintext: string): string {
    return this.jwtService.sign({ id: plaintext }, { expiresIn: '1d' });
  }
}
