import { UserModule } from './user.module';
import { GatewaysModule } from '@/infra/gateways/gateways.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ExceptionsModule } from '@/infra/exceptions/exceptions.module';

@Module({
  imports: [ConfigModule.forRoot(), GatewaysModule, UserModule, ExceptionsModule],
})
export class AppModule {}
