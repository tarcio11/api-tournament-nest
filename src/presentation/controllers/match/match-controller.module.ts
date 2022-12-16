import { MatchModule } from '@/domain/use-cases/match/match.module';
import { ChallengeModule } from '@/domain/use-cases/challenge/challenge.module';
import { CreateMatchController } from '@/presentation/controllers/match';
import { RankingModule } from '@/domain/use-cases/ranking/ranking.module';

import { Module } from '@nestjs/common';
import { Gateway } from '@/main/routes/websocket/gateway';

@Module({
  imports: [MatchModule, ChallengeModule, RankingModule],
  exports: [CreateMatchController],
  providers: [CreateMatchController, Gateway],
})
export class MatchControllerModule {}
