import { CreateRankingUseCase } from '@/domain/use-cases/ranking/create-ranking';
import { ShowRankingUseCase } from '@/domain/use-cases/ranking/show-raking';
import { RegisterUserOnRankingUseCase } from '@/domain/use-cases/ranking/register-user-on-ranking';
import { PgRankingRepoModule } from '@/infra/database/pg/repos/ranking/pg-ranking-repo.module';
import {
  CreateRankingUseCaseAbstract,
  ShowRankingUseCaseAbstract,
  RegisterUserOnRankingUseCaseAbstract,
} from '@/domain/use-cases';

import { Module } from '@nestjs/common';

@Module({
  imports: [PgRankingRepoModule],
  providers: [
    CreateRankingUseCase,
    { provide: CreateRankingUseCaseAbstract, useExisting: CreateRankingUseCase },
    ShowRankingUseCase,
    { provide: ShowRankingUseCaseAbstract, useExisting: ShowRankingUseCase },
    RegisterUserOnRankingUseCase,
    { provide: RegisterUserOnRankingUseCaseAbstract, useExisting: RegisterUserOnRankingUseCase },
  ],
  exports: [CreateRankingUseCaseAbstract, ShowRankingUseCaseAbstract, RegisterUserOnRankingUseCaseAbstract],
})
export class RankingModule {}
