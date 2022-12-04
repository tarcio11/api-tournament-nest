import { Match } from './match';

export type Status = 'PENDING' | 'ACCEPTED' | 'REJECTED' | 'FINISHED';
export type ChallengeData = {
  id?: string;
  status?: string;
  request_date?: Date;
  challenged_id: string;
  matches?: Match[];
  created_at?: Date;
  updated_at?: Date;
};
export class Challenge {
  id?: string;
  status: string;
  request_date: Date;
  challenged_id: string;
  matches: Match[];
  created_at?: Date;
  updated_at?: Date;

  constructor(data: ChallengeData) {
    this.status = 'PENDING';
    this.request_date = new Date();
    this.matches = data.matches || [];
    this.challenged_id = data.challenged_id;
    this.created_at = data.created_at;
    this.updated_at = data.updated_at;
  }
}
