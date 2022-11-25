import { CreateChallengeUseCaseAbstract } from '@/domain/use-cases/abstract-cases';
import { ChallengeRepositoryAbstract } from '@/domain/contracts/repos/challenge';
import { Injectable } from '@nestjs/common';
import { Challenge, User } from '@/domain/entities';

@Injectable()
export class CreateChallengeUseCase implements CreateChallengeUseCaseAbstract {
  constructor(private readonly challengeRepos: ChallengeRepositoryAbstract) {}

  async handle(user_id: string): Promise<void> {
    const user = await this.challengeRepos.findChallengesByUser(user_id);
    if (user) {
      const newUser = new User(user);
      newUser.createChallenge(new Challenge());
      await this.challengeRepos.add(newUser);
    }
  }
}
