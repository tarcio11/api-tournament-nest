import { UpdateChallengeUseCaseAbstract } from '@/domain/use-cases/abstract-cases';
import { ChallengeRepositoryAbstract } from '@/domain/contracts/repos/challenge';
import { Injectable } from '@nestjs/common';

type Input = { user_id: string; challenge: { id: string; status: string } };

@Injectable()
export class UpdateChallengeUseCase implements UpdateChallengeUseCaseAbstract {
  constructor(private readonly challengeRepos: ChallengeRepositoryAbstract) {}

  async handle({ challenge }: Input): Promise<void> {
    console.log('challenge', challenge);

    const challengeFound = await this.challengeRepos.findOne(challenge.id);
    if (challengeFound) {
      challengeFound.status = challenge.status;
      await this.challengeRepos.update(challengeFound);
    }
  }
}
