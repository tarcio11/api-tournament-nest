import { MatchModule } from '@/domain/use-cases/match/match.module';
import { ChallengeModule } from '@/domain/use-cases/challenge/challenge.module';
import { CreateMatchController } from '@/presentation/controllers/match';
import { RankingModule } from '@/domain/use-cases/ranking/ranking.module';

import { Module } from '@nestjs/common';

@Module({
  imports: [MatchModule, ChallengeModule, RankingModule],
  exports: [CreateMatchController],
  providers: [CreateMatchController],
})
export class MatchControllerModule {}
