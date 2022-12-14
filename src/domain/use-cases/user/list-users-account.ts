import { ListUserAccountUseCaseAbstract } from '@/domain/use-cases/abstract-cases';
import { UserRepositoryAbstract } from '@/domain/contracts/repos/user-account';
import { Injectable } from '@nestjs/common';
import { User } from '@/domain/entities';
import { ChallengeRepositoryAbstract } from '@/domain/contracts/repos/challenge';

@Injectable()
export class ListUserAccountUseCase implements ListUserAccountUseCaseAbstract {
  constructor(
    private readonly userRepos: UserRepositoryAbstract,
    private readonly challengeRepos: ChallengeRepositoryAbstract,
  ) {}

  async handle(): Promise<any> {
    const user = await this.userRepos.findAll();
    const challenges = await this.challengeRepos.findAll();

    const users: User[] = [];

    for (const userData of user) {
      const userExists = users.find((user) => user.id === userData.id);
      if (userExists) continue;

      const userDomain = new User(userData);
      const challengesUser = challenges.filter(
        (challenge) => challenge.user_id === userDomain.id || challenge.challenged_id === userDomain.id,
      );
      userDomain.challenges = challengesUser;
      users.push(userDomain);
    }

    return users;
  }
}
