import { Ranking } from '@/domain/entities';

export abstract class RankingRepositoryAbstract {
  abstract createMany: (input: Ranking[]) => Promise<void>;
  abstract findAll: () => Promise<RankingResponse[]>;
  abstract add: (ranking: Ranking) => Promise<void>;
}

export type RankingResponse = {
  user_id: string;
  name: string;
  avatar: string;
  points: number;
};
