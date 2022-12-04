import { CreateMatchUseCaseAbstract } from '../abstract-cases';
import { MatchRepositoryAbstract } from '@/domain/contracts/repos/match';
import { Injectable } from '@nestjs/common';
import { Challenge, Match } from '@/domain/entities';
import { IException } from '@/domain/exceptions';

export type Input = { challenge: Challenge; match: Match };

@Injectable()
export class CreateMatchUseCase implements CreateMatchUseCaseAbstract {
  constructor(private readonly matchRepos: MatchRepositoryAbstract, private readonly exceptionService: IException) {}

  async handle({ challenge, match }: Input): Promise<void> {
    if (challenge) {
      const newMatch = new Match(match);
      challenge.matches.push(newMatch);
      await this.matchRepos.add(challenge);
    }
  }
}
