import { ChallengeData } from '@/domain/entities';

export const mockChallengeInput = (): ChallengeData => ({
  id: '1',
  challenged_id: '2',
  request_date: new Date(),
  status: 'PENDING',
  created_at: new Date(),
  updated_at: new Date(),
});
