import { UserData } from '@/domain/entities';

export abstract class ChallengeRepositoryAbstract {
  abstract add: (user: UserData) => Promise<void>;
  abstract findChallengesByUser: (user_id: string) => Promise<UserData | undefined>;
}
