import { CreateChallengeUseCase } from '@/domain/use-cases/challenge/create-challenge';
import { PgChallengeRepoModule } from '@/infra/database/pg/repos/challenge/pg-challenge-repo.module';
import { ExceptionsModule } from '@/infra/exceptions/exceptions.module';
import { CreateChallengeUseCaseAbstract } from '@/domain/use-cases';

import { Module } from '@nestjs/common';

@Module({
  imports: [PgChallengeRepoModule, ExceptionsModule],
  providers: [CreateChallengeUseCase, { provide: CreateChallengeUseCaseAbstract, useExisting: CreateChallengeUseCase }],
  exports: [CreateChallengeUseCaseAbstract],
})
export class ChallengeModule {}
