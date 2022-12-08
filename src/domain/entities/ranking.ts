import { User } from './user';

export type RankingData = {
  id?: string;
  user_id: string;
  points: number;
  event: string;
  created_at?: Date;
  updated_at?: Date;
  user?: User;
};

export class Ranking {
  id?: string;
  user_id: string;
  points: number;
  event: string;
  created_at?: Date;
  updated_at?: Date;
  user: User;
  constructor(data: RankingData) {
    Object.assign(this, data);
  }
}
