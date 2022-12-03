import { User } from '@/domain/entities';
import { UserRepositoryAbstract } from '@/domain/contracts/repos/user-account';
import { ShowProfileUseCaseAbstract } from '@/domain/use-cases';
import { Injectable } from '@nestjs/common';

export type Input = { id: string };
type Output = User | undefined;

@Injectable()
export class ShowProfileUseCase implements ShowProfileUseCaseAbstract {
  constructor(private readonly userRepos: UserRepositoryAbstract) {}

  async handle({ id }: Input): Promise<Output> {
    const user = await this.userRepos.findOne(id);
    if (user) {
      const userDomain = new User(user);
      return userDomain;
    }
  }
}
