import { Challenge } from '@/domain/entities/challenge';

export type UserData = {
  id?: string;
  name: string;
  email: string;
  password: string;
  challenges?: Challenge[];
  created_at?: Date;
  updated_at?: Date;
};

export class User {
  id?: string;
  name: string;
  email: string;
  password: string;
  challenges?: Challenge[];
  created_at?: Date;
  updated_at?: Date;

  constructor(data: UserData) {
    this.id = data?.id;
    this.name = data.name;
    this.email = data.email;
    this.password = data.password;
    this.challenges = data.challenges;
    this.created_at = data.created_at;
    this.updated_at = data.updated_at;
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
}
