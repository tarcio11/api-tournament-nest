import { User } from '@/domain/entities';
import { UserRepositoryAbstract } from '@/domain/contracts/repos/user-account';
import { ShowProfileUseCase } from '@/domain/use-cases/user';
import { mock, MockProxy } from 'jest-mock-extended';
import { mockUserInput } from '../../mocks';

describe('ShowProfileUseCase', () => {
  let userRepos: MockProxy<UserRepositoryAbstract>;
  let sut: ShowProfileUseCase;

  beforeEach(() => {
    userRepos = mock<UserRepositoryAbstract>();
    sut = new ShowProfileUseCase(userRepos);
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
  });

  it('should call userRepos.findOne with correct params', async () => {
    const id = 'any_id';

    await sut.handle({ id });

    expect(userRepos.findOne).toHaveBeenCalledWith(id);
  });

  it('should return a user', async () => {
    userRepos.findOne.mockResolvedValueOnce(mockUserInput());
    const user = await sut.handle({ id: '1' });

    expect(user).toBeDefined();
    expect(user).toBeInstanceOf(User);
  });

  it('should return undefined', async () => {
    const user = await sut.handle({ id: '2' });

    expect(user).toBeUndefined();
  });
});
