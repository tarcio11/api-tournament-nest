import { ChallengeRepositoryAbstract } from '@/domain/contracts/repos/challenge';
import { CreateChallengeUseCase } from '@/domain/use-cases';
import { Challenge, User } from '@/domain/entities';
import { mock, MockProxy } from 'jest-mock-extended';
import MockDate from 'mockdate';

describe('CreateChallenge UseCase', () => {
  let challengeRepos: MockProxy<ChallengeRepositoryAbstract>;
  let sut: CreateChallengeUseCase;

  beforeEach(() => {
    challengeRepos = mock();
  });

  beforeEach(() => {
    sut = new CreateChallengeUseCase(challengeRepos);
  });

  beforeAll(() => {
    MockDate.set(new Date());
  });

  afterAll(() => {
    MockDate.reset();
  });

  it('should call findChallengesByUser with correct value', async () => {
    await sut.handle('any_user_id');
    expect(challengeRepos.findChallengesByUser).toHaveBeenCalledWith('any_user_id');
  });

  it('should throw if findChallengesByUser returns undefined', async () => {
    challengeRepos.findChallengesByUser.mockResolvedValueOnce(undefined);
    const result = await sut.handle('any_user_id');
    expect(result).toBeUndefined();
  });

  it('should call add with correct value', async () => {
    challengeRepos.findChallengesByUser.mockResolvedValueOnce({
      id: 'any_id',
      name: 'any_name',
      email: 'any_email',
      password: 'any_password',
      challenges: [],
    });
    await sut.handle('any_user_id');
    const newChallnge = new Challenge();
    const newUser = new User({
      id: 'any_id',
      name: 'any_name',
      email: 'any_email',
      password: 'any_password',
      challenges: [newChallnge],
    });

    expect(challengeRepos.add).toHaveBeenCalledWith(newUser);
  });

  it('should throw if add throws', async () => {
    challengeRepos.findChallengesByUser.mockResolvedValueOnce({
      name: 'any_name',
      email: 'any_email',
      password: 'any_password',
      challenges: [],
    });
    challengeRepos.add.mockRejectedValueOnce(new Error());
    const promise = sut.handle('any_user_id');
    await expect(promise).rejects.toThrow();
  });
});
