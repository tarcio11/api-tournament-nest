import { Module } from '@nestjs/common';
import { Hash, JwtService } from '@/infra/gateways';
import { Hasher, JwtServiceAbstract } from '@/domain/contracts/gateways';

@Module({
  providers: [
    Hash,
    { provide: Hasher, useExisting: Hash },
    JwtService,
    { provide: JwtServiceAbstract, useExisting: JwtService },
  ],
  exports: [Hasher, JwtServiceAbstract],
})
export class GatewaysModule {}
