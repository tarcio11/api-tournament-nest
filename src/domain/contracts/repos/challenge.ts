import { Challenge, UserData } from '@/domain/entities';

export abstract class ChallengeRepositoryAbstract {
  abstract add: (user: UserData) => Promise<void>;
  abstract findChallengesByUser: (user_id: string) => Promise<UserData | undefined>;
  abstract update: (challenge: Challenge) => Promise<void>;
  abstract findAll: () => Promise<any>;
  abstract findOne: (id: string) => Promise<Challenge | undefined>;
}
