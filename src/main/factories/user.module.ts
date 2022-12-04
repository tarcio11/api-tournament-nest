import { CreateUserControllerModule } from '@/presentation/controllers/user/create-user-controller.module';
import { CreateChallengeControllerModule } from '@/presentation/controllers/challenge/create-challenge-controller.module';
import { MatchControllerModule } from '@/presentation/controllers/match/match-controller.module';
import { UserRoutes } from '@/main/routes/user/user.routes';
import { ChallengeRoutes } from '@/main/routes/user/challenge.routes';
import { MatchRoutes } from '@/main/routes/user/match.routes';

import { Module } from '@nestjs/common';

@Module({
  imports: [CreateUserControllerModule, CreateChallengeControllerModule, MatchControllerModule],
  controllers: [UserRoutes, ChallengeRoutes, MatchRoutes],
})
export class UserModule {}
