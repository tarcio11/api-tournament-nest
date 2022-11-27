import { ChallengeRepositoryAbstract } from '@/domain/contracts/repos/challenge';
import { CreateChallengeUseCase } from '@/domain/use-cases/challenge';
import { Challenge, User } from '@/domain/entities';
import { mock, MockProxy } from 'jest-mock-extended';
import MockDate from 'mockdate';

type Input = { user_id: string; challenged_id: string };

describe('CreateChallenge UseCase', () => {
  let challengeRepos: MockProxy<ChallengeRepositoryAbstract>;
  let sut: CreateChallengeUseCase;
  let input: Input;

  beforeEach(() => {
    challengeRepos = mock();
  });

  beforeEach(() => {
    input = { user_id: 'any_user_id', challenged_id: 'any_challenged_id' };
    sut = new CreateChallengeUseCase(challengeRepos);
  });

  beforeAll(() => {
    MockDate.set(new Date());
  });

  afterAll(() => {
    MockDate.reset();
  });

  it('should call findChallengesByUser with correct value', async () => {
    await sut.handle(input);
    expect(challengeRepos.findChallengesByUser).toHaveBeenCalledWith('any_user_id');
  });

  it('should throw if findChallengesByUser returns undefined', async () => {
    challengeRepos.findChallengesByUser.mockResolvedValueOnce(undefined);
    const result = await sut.handle(input);
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
    await sut.handle(input);
    const newChallnge = new Challenge({ challenged_id: 'any_challenged_id' });
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
    const promise = sut.handle(input);
    await expect(promise).rejects.toThrow();
  });
});
