import { CreateUserControllerModule } from '@/presentation/controllers/user/create-user-controller.module';
import { CreateChallengeControllerModule } from '@/presentation/controllers/challenge/create-challenge-controller.module';
import { UserRoutes } from '@/main/routes/user/user.routes';
import { ChallengeRoutes } from '@/main/routes/user/challenge.routes';

import { Module } from '@nestjs/common';

@Module({
  imports: [CreateUserControllerModule, CreateChallengeControllerModule],
  controllers: [UserRoutes, ChallengeRoutes],
})
export class UserModule {}
