import { UseAccountModule } from '@/domain/use-cases';
import { RankingModule } from '@/domain/use-cases/ranking/ranking.module';
import {
  CreateUserController,
  ListUsersController,
  UserAuthenticationController,
  ShowProfileController,
  FindByIdController,
  UploadUserAvatarController,
} from '@/presentation/controllers/user';

import { Module } from '@nestjs/common';

@Module({
  imports: [UseAccountModule, RankingModule],
  exports: [
    CreateUserController,
    ListUsersController,
    UserAuthenticationController,
    ShowProfileController,
    FindByIdController,
    UploadUserAvatarController,
  ],
  providers: [
    CreateUserController,
    ListUsersController,
    UserAuthenticationController,
    ShowProfileController,
    FindByIdController,
    UploadUserAvatarController,
  ],
})
export class CreateUserControllerModule {}
