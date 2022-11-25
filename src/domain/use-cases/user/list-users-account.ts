import { ListUserAccountUseCaseAbstract } from '@/domain/use-cases/abstract-cases';
import { UserRepositoryAbstract } from '@/domain/contracts/repos/user-account';
import { Injectable } from '@nestjs/common';
import { UserData } from '@/domain/entities';

@Injectable()
export class ListUserAccountUseCase implements ListUserAccountUseCaseAbstract {
  constructor(private readonly userRepos: UserRepositoryAbstract) {}

  async handle(): Promise<UserData[]> {
    return this.userRepos.findAll();
  }
}
