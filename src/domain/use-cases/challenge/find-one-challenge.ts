import { FindOneChallengeUseCaseAbstract } from '@/domain/use-cases/abstract-cases';
import { ChallengeRepositoryAbstract } from '@/domain/contracts/repos/challenge';
import { Injectable } from '@nestjs/common';
import { Challenge } from '@/domain/entities';

type Input = { challenged_id: string };

@Injectable()
export class FindOneChallengeUseCase implements FindOneChallengeUseCaseAbstract {
  constructor(private readonly challengeRepos: ChallengeRepositoryAbstract) {}

  async handle({ challenged_id }: Input): Promise<Challenge | undefined> {
    return this.challengeRepos.findOne(challenged_id);
  }
}
