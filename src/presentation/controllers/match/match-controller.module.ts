import { MatchModule } from '@/domain/use-cases/match/match.module';
import { ChallengeModule } from '@/domain/use-cases/challenge/challenge.module';
import { CreateMatchController } from '@/presentation/controllers/match';

import { Module } from '@nestjs/common';

@Module({
  imports: [MatchModule, ChallengeModule],
  exports: [CreateMatchController],
  providers: [CreateMatchController],
})
export class MatchControllerModule {}
