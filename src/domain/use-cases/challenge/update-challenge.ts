import { UpdateChallengeUseCaseAbstract } from '@/domain/use-cases/abstract-cases';
import { ChallengeRepositoryAbstract } from '@/domain/contracts/repos/challenge';
import { Injectable } from '@nestjs/common';
import { User } from '@/domain/entities';

type Input = { user_id: string; challenge: { id: string; status: string } };

@Injectable()
export class UpdateChallengeUseCase implements UpdateChallengeUseCaseAbstract {
  constructor(private readonly challengeRepos: ChallengeRepositoryAbstract) {}

  async handle({ user_id, challenge }: Input): Promise<void> {
    const user = await this.challengeRepos.findChallengesByUser(user_id);
    if (user) {
      const newUser = new User(user);
      newUser.updateChallenge(challenge.id, { status: challenge.status });
      await this.challengeRepos.update(newUser);
    }
  }
}
