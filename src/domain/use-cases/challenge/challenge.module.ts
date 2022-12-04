import { CreateChallengeUseCase, UpdateChallengeUseCase, FindOneChallengeUseCase } from '@/domain/use-cases/challenge';
import { PgChallengeRepoModule } from '@/infra/database/pg/repos/challenge/pg-challenge-repo.module';
import { ExceptionsModule } from '@/infra/exceptions/exceptions.module';
import {
  CreateChallengeUseCaseAbstract,
  UpdateChallengeUseCaseAbstract,
  FindOneChallengeUseCaseAbstract,
} from '@/domain/use-cases';

import { Module } from '@nestjs/common';

@Module({
  imports: [PgChallengeRepoModule, ExceptionsModule],
  providers: [
    CreateChallengeUseCase,
    { provide: CreateChallengeUseCaseAbstract, useExisting: CreateChallengeUseCase },
    UpdateChallengeUseCase,
    { provide: UpdateChallengeUseCaseAbstract, useExisting: UpdateChallengeUseCase },
    FindOneChallengeUseCase,
    { provide: FindOneChallengeUseCaseAbstract, useExisting: FindOneChallengeUseCase },
  ],
  exports: [CreateChallengeUseCaseAbstract, UpdateChallengeUseCaseAbstract, FindOneChallengeUseCaseAbstract],
})
export class ChallengeModule {}
