import { Challenge } from './challenge';

export type MatchData = {
  id?: string;
  playWinner_id: string;
  playLoser_id: string;
  scoreWinner: number;
  scoreLoser: number;
  draw: boolean;
  challenge?: Challenge;
  created_at?: Date;
  updated_at?: Date;
};

export class Match {
  id?: string;
  playWinner_id: string;
  playLoser_id: string;
  scoreWinner: number;
  scoreLoser: number;
  draw: boolean;
  challenge: Challenge;
  created_at?: Date;
  updated_at?: Date;

  constructor(data: MatchData) {
    Object.assign(this, data);
  }
}
