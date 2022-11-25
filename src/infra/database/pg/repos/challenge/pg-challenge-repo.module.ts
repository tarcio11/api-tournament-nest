import { ChallengeRepositoryAbstract } from '@/domain/contracts/repos/challenge';
import { PgChallengeRepo } from './pg-challenge-repo';

import { Module } from '@nestjs/common';

@Module({
  providers: [PgChallengeRepo, { provide: ChallengeRepositoryAbstract, useExisting: PgChallengeRepo }],
  exports: [ChallengeRepositoryAbstract],
})
export class PgChallengeRepoModule {}
