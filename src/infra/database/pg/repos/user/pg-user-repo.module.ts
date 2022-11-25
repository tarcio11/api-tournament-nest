import { UserRepositoryAbstract } from '../../../../../domain/contracts/repos/user-account';
import { PgUserRepo } from '@/infra/database/pg/repos/user/';

import { Module } from '@nestjs/common';

@Module({
  providers: [PgUserRepo, { provide: UserRepositoryAbstract, useExisting: PgUserRepo }],
  exports: [UserRepositoryAbstract],
})
export class PgUserRepoModule {}
