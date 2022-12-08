import { ShowRankingController } from '@/presentation/controllers/ranking/show-ranking-controller';
import { RankingModule } from '@/domain/use-cases/ranking/ranking.module';

import { Module } from '@nestjs/common';

@Module({
  imports: [RankingModule],
  exports: [ShowRankingController],
  providers: [ShowRankingController],
})
export class RankingControllerModule {}
