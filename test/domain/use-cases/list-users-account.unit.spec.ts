import { ListUserAccountUseCase } from '@/domain/use-cases/user';
import { UserRepositoryAbstract } from '@/domain/contracts/repos/user-account';
import { User } from '@/domain/entities';
import { mock, MockProxy } from 'jest-mock-extended';

describe('ListUserAccountUseCase', () => {
  let userAccountRepos: MockProxy<UserRepositoryAbstract>;
  let sut: ListUserAccountUseCase;

  beforeEach(() => {
    userAccountRepos = mock();
  });

  beforeEach(() => {
    sut = new ListUserAccountUseCase(userAccountRepos);
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
  });

  it('should call userAccountRepos.findAll', async () => {
    await sut.handle();
    expect(userAccountRepos.findAll).toHaveBeenCalled();
  });

  it('should return an array of users', async () => {
    const user = new User({
      email: 'jhoeDoe@email.com',
      name: 'Jhony Doe',
      password: '123456',
    });

    userAccountRepos.findAll.mockResolvedValueOnce([user]);
    const users = await sut.handle();
    expect(users).toBeInstanceOf(Array);
    expect(users).toEqual([user]);
  });

  it('should throw if userAccountRepos.findAll throws', async () => {
    userAccountRepos.findAll.mockRejectedValueOnce(new Error());
    const promise = sut.handle();
    await expect(promise).rejects.toThrow();
  });
});
