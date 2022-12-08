import { CreateUserControllerModule } from '@/presentation/controllers/user/create-user-controller.module';
import { CreateChallengeControllerModule } from '@/presentation/controllers/challenge/create-challenge-controller.module';
import { MatchControllerModule } from '@/presentation/controllers/match/match-controller.module';
import { RankingControllerModule } from '@/presentation/controllers/ranking/ranking-controller.module';
import { UserRoutes } from '@/main/routes/user/user.routes';
import { RankingRoutes } from '@/main/routes/user/ranking.routes';
import { ChallengeRoutes } from '@/main/routes/user/challenge.routes';
import { MatchRoutes } from '@/main/routes/user/match.routes';

import { Module } from '@nestjs/common';

@Module({
  imports: [
    CreateUserControllerModule,
    CreateChallengeControllerModule,
    MatchControllerModule,
    RankingControllerModule,
  ],
  controllers: [UserRoutes, ChallengeRoutes, MatchRoutes, RankingRoutes],
})
export class UserModule {}
