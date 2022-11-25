import { AddUserAccountUseCaseAbstract } from '@/domain/use-cases/abstract-cases';
import { userModel, UserRepositoryAbstract } from '@/domain/contracts/repos/user-account';
import { Hasher } from '@/domain/contracts/gateways';
import { User, UserData } from '@/domain/entities';
import { IException } from '@/domain/exceptions';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AddUserAccountUseCase implements AddUserAccountUseCaseAbstract {
  constructor(
    private readonly userRepos: UserRepositoryAbstract,
    private readonly hash: Hasher,
    private readonly exceptionService: IException,
  ) {}

  async handle(input: UserData): Promise<userModel> {
    const userAccountFound = await this.userRepos.checkByEmail(input.email);
    if (userAccountFound) {
      this.exceptionService.badRequestException({ message: 'Email already in use', code: '400' });
    }
    const accessToken = await this.hash.hash({ value: input.password });
    const user = new User({ ...input, password: accessToken });
    return await this.userRepos.add(user);
  }
}
