import { User, UserData } from '@/domain/entities';

export abstract class UserRepositoryAbstract {
  abstract add: (data: User) => Promise<userModel>;
  abstract checkByEmail: (email: string) => Promise<boolean>;
  abstract findAll: () => Promise<UserData[]>;
  abstract loadAccountByEmail: (email: string) => Promise<userModel | undefined>;
}

export type userModel = {
  id: string;
  name: string;
  email: string;
  password: string;
  created_at: Date;
  updated_at: Date;
};
