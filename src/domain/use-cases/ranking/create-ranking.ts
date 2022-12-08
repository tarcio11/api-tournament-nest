import { CreateRankingUseCaseAbstract } from '../abstract-cases';
import { RankingRepositoryAbstract } from '@/domain/contracts/repos/ranking';
import { Injectable } from '@nestjs/common';
import { Ranking } from '@/domain/entities';

type MatchResult = {
  playWinner_id: string;
  playLoser_id: string;
  scoreWinner: number;
  scoreLoser: number;
  draw: boolean;
};

enum Event {
  VICTORY = 'VICTORY',
  DEFEAT = 'DEFEAT',
  DRAW = 'DRAW',
}

enum Points {
  VICTORY = 3,
  DEFEAT = 0,
  DRAW = 1,
}

export type Input = { player: MatchResult };

@Injectable()
export class CreateRankingUseCase implements CreateRankingUseCaseAbstract {
  constructor(private readonly rankingRepo: RankingRepositoryAbstract) {}

  async handle({ player }: Input): Promise<void> {
    try {
      if (player.draw) {
        const rankingWinner = new Ranking({
          event: Event.DRAW,
          points: Points.DRAW,
          user_id: player.playWinner_id,
        });

        const rankingLoser = new Ranking({
          event: Event.DRAW,
          points: Points.DRAW,
          user_id: player.playLoser_id,
        });
        await this.rankingRepo.createMany([rankingWinner, rankingLoser]);
        return;
      }

      const rankingWinner = new Ranking({
        event: Event.VICTORY,
        points: Points.VICTORY,
        user_id: player.playWinner_id,
      });

      const rankingLoser = new Ranking({
        event: Event.DEFEAT,
        points: Points.DEFEAT,
        user_id: player.playLoser_id,
      });
      await this.rankingRepo.createMany([rankingWinner, rankingLoser]);
    } catch (error: any) {
      throw error;
    }
  }
}
