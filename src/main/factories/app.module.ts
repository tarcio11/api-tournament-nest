import { UserModule } from './user.module';
import { GatewaysModule } from '@/infra/gateways/gateways.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ExceptionsModule } from '@/infra/exceptions/exceptions.module';
import { Gateway, server } from '../routes/websocket/gateway';

@Module({
  imports: [ConfigModule.forRoot(), GatewaysModule, UserModule, ExceptionsModule],
})
export class AppModule {
  constructor() {
    server.on('connection', (client, req) => {
      const controller = new Gateway();
      controller.handleConnection(client, req);
    });
  }
}
