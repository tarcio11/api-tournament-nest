import { Hasher } from '@/domain/contracts/gateways';
import { UserRepositoryAbstract } from '@/domain/contracts/repos/user-account';
import { User } from '@/domain/entities';

type Setup = (userAccountRepo: UserRepositoryAbstract, hashProvider: Hasher) => CreateAccount;
type Input = { name: string; email: string; password: string };
type Output = void;
export type CreateAccount = (input: Input) => Promise<Output>;

export const setupCreateAccount: Setup = (userAccountRepo, hashProvider) => async (input) => {
  const userAccountFound = await userAccountRepo.checkByEmail(input.email);
  if (userAccountFound) throw new Error('Email already in use');
  const accessToken = await hashProvider.hash({ value: input.password });
  const user = new User({ ...input, password: accessToken });
  await userAccountRepo.add(user);
};
