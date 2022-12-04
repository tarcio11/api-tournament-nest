import { CreateMatchUseCase } from '@/domain/use-cases/match/create-match';
import { PgMatchRepoModule } from '@/infra/database/pg/repos/match/pg-match-repo.module';
import { ExceptionsModule } from '@/infra/exceptions/exceptions.module';
import { CreateMatchUseCaseAbstract } from '@/domain/use-cases';

import { Module } from '@nestjs/common';
import { ChallengeRepositoryAbstract } from '@/domain/contracts/repos/challenge';

@Module({
  imports: [PgMatchRepoModule, ExceptionsModule],
  providers: [
    CreateMatchUseCase,
    { provide: CreateMatchUseCaseAbstract, useExisting: CreateMatchUseCase },
    { provide: ChallengeRepositoryAbstract, useExisting: CreateMatchUseCase },
  ],
  exports: [CreateMatchUseCaseAbstract, ChallengeRepositoryAbstract],
})
export class MatchModule {}
