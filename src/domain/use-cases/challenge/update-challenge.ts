import { UpdateChallengeUseCaseAbstract } from '@/domain/use-cases/abstract-cases';
import { ChallengeRepositoryAbstract } from '@/domain/contracts/repos/challenge';
import { Injectable } from '@nestjs/common';

type Input = { user_id: string; challenge: { id: string; status: string } };
type Output = {
  challenger_id: string;
};

@Injectable()
export class UpdateChallengeUseCase implements UpdateChallengeUseCaseAbstract {
  constructor(private readonly challengeRepos: ChallengeRepositoryAbstract) {}

  async handle({ challenge }: Input): Promise<Output | undefined> {
    const challengeFound = await this.challengeRepos.findOne(challenge.id);
    if (challengeFound) {
      challengeFound.status = challenge.status;
      return this.challengeRepos.update(challengeFound);
    }
  }
}
