import { UseAccountModule } from '@/domain/use-cases';
import {
  CreateUserController,
  ListUsersController,
  UserAuthenticationController,
  ShowProfileController,
} from '@/presentation/controllers/user';

import { Module } from '@nestjs/common';

@Module({
  imports: [UseAccountModule],
  exports: [CreateUserController, ListUsersController, UserAuthenticationController, ShowProfileController],
  providers: [CreateUserController, ListUsersController, UserAuthenticationController, ShowProfileController],
})
export class CreateUserControllerModule {}
