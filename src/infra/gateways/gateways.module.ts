import { Module } from '@nestjs/common';
import { Hash, JwtService, StorageProvider } from '@/infra/gateways';
import { Hasher, JwtServiceAbstract, StorageProviderAbstract } from '@/domain/contracts/gateways';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategyService } from '../strategies/jwt-strategy.service';
import { env } from '@/main/config/env';

@Module({
  imports: [
    JwtModule.register({
      secret: env.jwtSecret,
    }),
  ],
  providers: [
    Hash,
    { provide: Hasher, useExisting: Hash },
    JwtService,
    { provide: JwtServiceAbstract, useExisting: JwtService },
    JwtStrategyService,
    StorageProvider,
    { provide: StorageProviderAbstract, useExisting: StorageProvider },
  ],
  exports: [Hasher, JwtServiceAbstract, StorageProviderAbstract],
})
export class GatewaysModule {}
