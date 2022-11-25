import { UseAccountModule } from '@/domain/use-cases';
import { CreateUserController, ListUsersController, UserAuthenticationController } from '@/presentation/controllers';

import { Module } from '@nestjs/common';

@Module({
  imports: [UseAccountModule],
  exports: [CreateUserController, ListUsersController, UserAuthenticationController],
  providers: [CreateUserController, ListUsersController, UserAuthenticationController],
})
export class CreateUserControllerModule {}
