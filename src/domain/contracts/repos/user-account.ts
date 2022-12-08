import { User, UserData } from '@/domain/entities';

export abstract class UserRepositoryAbstract {
  abstract add: (data: User) => Promise<userModel>;
  abstract checkByEmail: (email: string) => Promise<boolean>;
  abstract findAll: () => Promise<UserData[]>;
  abstract loadAccountByEmail: (email: string) => Promise<userModel | undefined>;
  abstract findOne: (id: string) => Promise<UserData | undefined>;
  abstract update: (data: User) => Promise<userModel>;
}

export type userModel = {
  id: string;
  name: string;
  email: string;
  avatar: string;
  password: string;
  created_at: Date;
  updated_at: Date;
};
