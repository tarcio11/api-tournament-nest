import { ChallengeModule } from '@/domain/use-cases/challenge/challenge.module';
import { CreateChallengeController, UpdateChallengeController } from '@/presentation/controllers/challenge';

import { Module } from '@nestjs/common';

@Module({
  imports: [ChallengeModule],
  exports: [CreateChallengeController, UpdateChallengeController],
  providers: [CreateChallengeController, UpdateChallengeController],
})
export class CreateChallengeControllerModule {}
