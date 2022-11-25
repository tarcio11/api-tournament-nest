import { UserRepositoryAbstract } from '@/domain/contracts/repos/user-account';
import { AddUserAccountUseCase } from '@/domain/use-cases/user/user-account';
import { Hasher } from '@/domain/contracts/gateways';
import { IException } from '@/domain/exceptions';
import { mock, MockProxy } from 'jest-mock-extended';

describe('UserAccount UseCase', () => {
  let userAccountRepos: MockProxy<UserRepositoryAbstract>;
  let hasher: MockProxy<Hasher>;
  let exceptionService: MockProxy<IException>;
  let sut: AddUserAccountUseCase;

  beforeEach(() => {
    userAccountRepos = mock();
    hasher = mock();
    exceptionService = mock();
  });

  beforeEach(() => {
    sut = new AddUserAccountUseCase(userAccountRepos, hasher, exceptionService);
  });

  it('should call CheckAccountByEmailRepository with correct email', async () => {
    await sut.handle({ name: 'any_name', email: 'any_email', password: 'any_password' });
    expect(userAccountRepos.checkByEmail).toHaveBeenCalledWith({ email: 'any_email' });
  });

  it('should throw if badRequestException returns true', async () => {
    userAccountRepos.checkByEmail.mockResolvedValueOnce(true);
    await sut.handle({ name: 'any_name', email: 'any_email', password: 'any_password' });
    expect(exceptionService.badRequestException).toHaveBeenCalledWith({ message: 'Email already in use', code: '400' });
  });

  it('should call Hasher with correct value', async () => {
    await sut.handle({ name: 'any_name', email: 'any_email', password: 'any_password' });
    expect(hasher.hash).toHaveBeenCalledWith({ value: 'any_password' });
  });

  it('should throw if Hasher throws', async () => {
    hasher.hash.mockRejectedValueOnce(new Error());
    const promise = sut.handle({ name: 'any_name', email: 'any_email', password: 'any_password' });
    await expect(promise).rejects.toThrow();
  });

  it('should call AddUserAccountRepository with correct values', async () => {
    hasher.hash.mockResolvedValueOnce('hashed_password');
    await sut.handle({ name: 'any_name', email: 'any_email', password: 'any_password' });
    expect(userAccountRepos.add).toHaveBeenCalledWith({
      name: 'any_name',
      email: 'any_email',
      password: 'hashed_password',
    });
  });

  it('should throw if AddUserAccountRepository throws', async () => {
    userAccountRepos.add.mockRejectedValueOnce(new Error());
    const promise = sut.handle({ name: 'any_name', email: 'any_email', password: 'any_password' });
    await expect(promise).rejects.toThrow();
  });
});
