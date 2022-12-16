import { Challenge, UserData } from '@/domain/entities';

export abstract class ChallengeRepositoryAbstract {
  abstract add: (user: Challenge) => Promise<any>;
  abstract findChallengesByUser: (user_id: string) => Promise<UserData | undefined>;
  abstract update: (challenge: Challenge) => Promise<any>;
  abstract findAll: () => Promise<any>;
  abstract findOne: (id: string) => Promise<Challenge | undefined>;
}
