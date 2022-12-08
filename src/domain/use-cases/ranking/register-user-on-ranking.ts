import { RegisterUserOnRankingUseCaseAbstract } from '../abstract-cases';
import { RankingRepositoryAbstract } from '@/domain/contracts/repos/ranking';
import { Injectable } from '@nestjs/common';
import { Ranking } from '@/domain/entities';

type Player = {
  user_id: string;
};

enum Event {
  VICTORY = 'VICTORY',
  DEFEAT = 'DEFEAT',
  DRAW = 'DRAW',
}

export type Input = { player: Player };

@Injectable()
export class RegisterUserOnRankingUseCase implements RegisterUserOnRankingUseCaseAbstract {
  constructor(private readonly rankingRepo: RankingRepositoryAbstract) {}

  async handle({ player }: Input): Promise<void> {
    const userOnRanking = new Ranking({
      event: Event.VICTORY,
      points: 0,
      user_id: player.user_id,
    });
    await this.rankingRepo.add(userOnRanking);
  }
  catch(error: any) {
    throw error;
  }
}
