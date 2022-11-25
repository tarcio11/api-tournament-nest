import { AddUserAccountUseCase, ListUserAccountUseCase, UserAuthenticationUseCase } from '@/domain/use-cases/user';
import { PgUserRepoModule } from '@/infra/database/pg/repos';
import { GatewaysModule } from '@/infra/gateways/gateways.module';
import { ExceptionsModule } from '@/infra/exceptions/exceptions.module';
import {
  AddUserAccountUseCaseAbstract,
  ListUserAccountUseCaseAbstract,
  UserAuthenticationUseCaseAbstract,
} from '@/domain/use-cases';

import { Module } from '@nestjs/common';

@Module({
  imports: [PgUserRepoModule, GatewaysModule, ExceptionsModule],
  providers: [
    UserAuthenticationUseCase,
    { provide: UserAuthenticationUseCaseAbstract, useExisting: UserAuthenticationUseCase },
    AddUserAccountUseCase,
    { provide: AddUserAccountUseCaseAbstract, useExisting: AddUserAccountUseCase },
    ListUserAccountUseCase,
    { provide: ListUserAccountUseCaseAbstract, useExisting: ListUserAccountUseCase },
  ],
  exports: [UserAuthenticationUseCaseAbstract, AddUserAccountUseCaseAbstract, ListUserAccountUseCaseAbstract],
})
export class UseAccountModule {}
