import { UserData } from '@/domain/entities';

export const mockUserInput = (): any => ({
  id: '1',
  name: 'any_name',
  email: 'any_email@mail.com',
  password: 'any_password',
  challenges: [],
  created_at: new Date(),
  updated_at: new Date(),
});
