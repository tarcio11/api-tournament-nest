import { Challenge } from '@/domain/entities/challenge';

export type UserData = {
  id?: string;
  name: string;
  email: string;
  password: string;
  avatar?: string;
  challenges?: Challenge[];
  created_at?: Date;
  updated_at?: Date;
};

export class User {
  id?: string;
  name: string;
  email: string;
  password: string;
  avatar?: string;
  challenges?: Challenge[];
  created_at?: Date;
  updated_at?: Date;

  constructor(data: UserData) {
    Object.assign(this, data);
  }

  createChallenge(challenge: Challenge): void {
    this.challenges?.push(challenge);
  }

  findChallenge(challengeId: string): Challenge | undefined {
    return this.challenges?.find((challenge) => challenge.id === challengeId);
  }

  findChallenges(): Challenge[] | undefined {
    return this.challenges;
  }

  updateChallenge(challenge_id: string, data: { status: string }): void {
    const challenge = this.findChallenge(challenge_id);
    if (challenge) {
      challenge.status = data.status;
    }
  }
}
