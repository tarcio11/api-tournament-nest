import { MatchRepositoryAbstract } from '@/domain/contracts/repos/match';
import { PgMatchRepo } from './pg-match-repo';

import { Module } from '@nestjs/common';

@Module({
  providers: [PgMatchRepo, { provide: MatchRepositoryAbstract, useExisting: PgMatchRepo }],
  exports: [MatchRepositoryAbstract],
})
export class PgMatchRepoModule {}
