import { CreateChallengeUseCaseAbstract } from '@/domain/use-cases/abstract-cases';
import { ChallengeRepositoryAbstract } from '@/domain/contracts/repos/challenge';
import { Injectable } from '@nestjs/common';
import { Challenge, User } from '@/domain/entities';
import { IException } from '@/domain/exceptions';

type Input = { user_id: string; challenged_id: string };

@Injectable()
export class CreateChallengeUseCase implements CreateChallengeUseCaseAbstract {
  constructor(
    private readonly challengeRepos: ChallengeRepositoryAbstract,
    private readonly exceptionService: IException,
  ) {}

  async handle({ user_id, challenged_id }: Input): Promise<any> {
    const user = await this.challengeRepos.findChallengesByUser(user_id);
    if (user) {
      const newUser = new User(user);
      const challengeInProcess = newUser.challenges?.find((challenge) => challenge.status === 'ACCEPTED');
      if (challengeInProcess) {
        this.exceptionService.UnauthorizedException({
          message: 'You already have a challenge in process',
          code: '401',
        });
      }
      const challenge = new Challenge({ challenged_id, user_id });
      return await this.challengeRepos.add(challenge);
    }
  }
}
