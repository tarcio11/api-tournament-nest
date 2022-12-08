import {
  AddUserAccountUseCase,
  ListUserAccountUseCase,
  UserAuthenticationUseCase,
  ShowProfileUseCase,
  UploadUserAvatarUseCase,
} from '@/domain/use-cases/user';
import { FindByIdUseCase } from './find-by-id';
import { PgUserRepoModule, PgChallengeRepoModule } from '@/infra/database/pg/repos';
import { GatewaysModule } from '@/infra/gateways/gateways.module';
import { ExceptionsModule } from '@/infra/exceptions/exceptions.module';
import {
  AddUserAccountUseCaseAbstract,
  ListUserAccountUseCaseAbstract,
  UserAuthenticationUseCaseAbstract,
  ShowProfileUseCaseAbstract,
  FindByIdUseCaseAbstract,
  UploadUserAvatarUseCaseAbstract,
} from '@/domain/use-cases';

import { Module } from '@nestjs/common';

@Module({
  imports: [PgUserRepoModule, GatewaysModule, ExceptionsModule, PgChallengeRepoModule],
  providers: [
    UserAuthenticationUseCase,
    { provide: UserAuthenticationUseCaseAbstract, useExisting: UserAuthenticationUseCase },
    AddUserAccountUseCase,
    { provide: AddUserAccountUseCaseAbstract, useExisting: AddUserAccountUseCase },
    ListUserAccountUseCase,
    { provide: ListUserAccountUseCaseAbstract, useExisting: ListUserAccountUseCase },
    ShowProfileUseCase,
    { provide: ShowProfileUseCaseAbstract, useExisting: ShowProfileUseCase },
    FindByIdUseCase,
    { provide: FindByIdUseCaseAbstract, useExisting: FindByIdUseCase },
    UploadUserAvatarUseCase,
    { provide: UploadUserAvatarUseCaseAbstract, useExisting: UploadUserAvatarUseCase },
  ],
  exports: [
    UserAuthenticationUseCaseAbstract,
    AddUserAccountUseCaseAbstract,
    ListUserAccountUseCaseAbstract,
    ShowProfileUseCaseAbstract,
    FindByIdUseCaseAbstract,
    UploadUserAvatarUseCaseAbstract,
  ],
})
export class UseAccountModule {}
