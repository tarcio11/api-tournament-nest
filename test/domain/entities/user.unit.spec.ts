import { User, Challenge } from '@/domain/entities';
import MockDate from 'mockdate';

const mockUserEntity = (): User => ({
  name: 'John Doe',
  email: 'john.doe@gmail.com',
  password: 'any_password',
  challenges: [],
  createChallenge: jest.fn(),
  findChallenge: jest.fn(),
  findChallenges: jest.fn(),
});

describe('User Domain', () => {
  let USER_MOCK: User;
  let CHALLENGE_MOCK: Challenge;

  beforeAll(() => {
    MockDate.set(new Date());
  });

  beforeEach(() => {
    USER_MOCK = new User(mockUserEntity());
    CHALLENGE_MOCK = new Challenge({ challenged_id: 'any_challenged_id' });
  });

  afterAll(() => {
    MockDate.reset();
  });

  it('should create an user', () => {
    const user = new User(USER_MOCK);
    expect(user.email).toEqual('john.doe@gmail.com');
  });

  it('should create an user with challenges', () => {
    const challenge = new Challenge({ challenged_id: 'any_challenged_id' });

    USER_MOCK.createChallenge(challenge);

    expect(USER_MOCK.challenges).toEqual([challenge]);
  });

  it('should find a challenge by id', () => {
    const challenge = new Challenge({ id: 'any_id', challenged_id: 'any_challenged_id' });

    USER_MOCK.createChallenge(challenge);

    const foundChallenge = USER_MOCK.findChallenge('any_id');

    expect(foundChallenge).toEqual(CHALLENGE_MOCK);
  });

  it('should return undefined if challenge not found', () => {
    const challenge = new Challenge({ challenged_id: 'any_challenged_id' });

    USER_MOCK.createChallenge(challenge);

    const foundChallenge = USER_MOCK.findChallenge('invalid_id');

    expect(foundChallenge).toBeUndefined();
  });

  it('should return undefined if no challenges', () => {
    USER_MOCK.challenges = undefined;
    const foundChallenge = USER_MOCK.findChallenge('invalid_id');

    expect(foundChallenge).toBeUndefined();
  });

  it('should return an empty array if user has no challenges', () => {
    const challenges = USER_MOCK.findChallenges();

    expect(challenges).toEqual([]);
  });

  it('should return an array of challenges', () => {
    const challenge = new Challenge({ challenged_id: 'any_challenged_id' });

    USER_MOCK.createChallenge(challenge);
    USER_MOCK.createChallenge(CHALLENGE_MOCK);

    const challenges = USER_MOCK.findChallenges();

    expect(challenges).toEqual([challenge, CHALLENGE_MOCK]);
  });

  it('should update user if exists', () => {
    const user = new User(USER_MOCK);

    user.name = 'John Doe Jr';

    expect(user.name).toEqual('John Doe Jr');
  });
});
