import { Module } from '@nestjs/common';
import { Hash, JwtService } from '@/infra/gateways';
import { Hasher, JwtServiceAbstract } from '@/domain/contracts/gateways';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategyService } from '../strategies/jwt-strategy.service';

@Module({
  imports: [
    JwtModule.register({
      secret: 'secret',
    }),
  ],
  providers: [
    Hash,
    { provide: Hasher, useExisting: Hash },
    JwtService,
    { provide: JwtServiceAbstract, useExisting: JwtService },
    JwtStrategyService,
  ],
  exports: [Hasher, JwtServiceAbstract],
})
export class GatewaysModule {}
