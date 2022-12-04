import { Challenge } from '@/domain/entities';

export abstract class MatchRepositoryAbstract {
  abstract add: (challenge: Challenge) => Promise<void>;
}
