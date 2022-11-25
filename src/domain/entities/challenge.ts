export type Status = 'PENDING' | 'ACCEPTED' | 'REJECTED' | 'FINISHED';
export class Challenge {
  id: string;
  status: string;
  request_date: Date;
  created_at: Date;
  updated_at: Date;

  constructor() {
    this.status = 'PENDING';
    this.request_date = new Date();
  }
}
