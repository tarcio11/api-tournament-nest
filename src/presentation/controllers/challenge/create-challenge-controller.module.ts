import { ChallengeModule } from '@/domain/use-cases/challenge/challenge.module';
import { CreateChallengeController } from '@/presentation/controllers/challenge/create-challenge-controller';

import { Module } from '@nestjs/common';

@Module({
  imports: [ChallengeModule],
  exports: [CreateChallengeController],
  providers: [CreateChallengeController],
})
export class CreateChallengeControllerModule {}
