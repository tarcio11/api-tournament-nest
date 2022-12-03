import { CreateChallengeUseCase, UpdateChallengeUseCase } from '@/domain/use-cases/challenge';
import { PgChallengeRepoModule } from '@/infra/database/pg/repos/challenge/pg-challenge-repo.module';
import { ExceptionsModule } from '@/infra/exceptions/exceptions.module';
import { CreateChallengeUseCaseAbstract, UpdateChallengeUseCaseAbstract } from '@/domain/use-cases';

import { Module } from '@nestjs/common';

@Module({
  imports: [PgChallengeRepoModule, ExceptionsModule],
  providers: [
    CreateChallengeUseCase,
    { provide: CreateChallengeUseCaseAbstract, useExisting: CreateChallengeUseCase },
    UpdateChallengeUseCase,
    { provide: UpdateChallengeUseCaseAbstract, useExisting: UpdateChallengeUseCase },
  ],
  exports: [CreateChallengeUseCaseAbstract, UpdateChallengeUseCaseAbstract],
})
export class ChallengeModule {}
