import { mock, MockProxy } from 'jest-mock-extended';
import { Hasher, JwtServiceAbstract } from '@/domain/contracts/gateways';
import { UserRepositoryAbstract } from '@/domain/contracts/repos/user-account';
import { IException } from '@/domain/exceptions';
import { UserAuthenticationUseCase } from '@/domain/use-cases/user';
import { mockUserInput } from '@/test/mocks';
import MockDate from 'mockdate';

type Input = { email: string; password: string };

describe('UserAuthenticationUseCase', () => {
  let userRepos: MockProxy<UserRepositoryAbstract>;
  let hash: MockProxy<Hasher>;
  let jwtService: MockProxy<JwtServiceAbstract>;
  let exceptionService: MockProxy<IException>;
  let input: MockProxy<Input>;
  let sut: UserAuthenticationUseCase;

  beforeEach(() => {
    input = { email: 'any_email', password: 'any_password' };
    userRepos = mock<UserRepositoryAbstract>();
    hash = mock<Hasher>();
    jwtService = mock<JwtServiceAbstract>();
    exceptionService = mock<IException>();
    sut = new UserAuthenticationUseCase(userRepos, hash, jwtService, exceptionService);
  });

  beforeAll(() => {
    MockDate.set(new Date());
  });

  afterAll(() => {
    MockDate.reset();
  });

  it('should return UnauthorizedException if user not found', async () => {
    userRepos.loadAccountByEmail.mockResolvedValueOnce(undefined);
    const result = await sut.handle(input);
    expect(result).toEqual(exceptionService.UnauthorizedException({ message: 'Invalid credentials', code: '401' }));
  });

  it('should return UnauthorizedException if password is invalid', async () => {
    userRepos.loadAccountByEmail.mockResolvedValueOnce(mockUserInput());
    hash.compare.mockResolvedValueOnce(false);
    const result = await sut.handle(input);
    expect(result).toEqual(exceptionService.UnauthorizedException({ message: 'Invalid credentials', code: '401' }));
  });

  it('should return user and accessToken if password is valid', async () => {
    userRepos.loadAccountByEmail.mockResolvedValueOnce(mockUserInput());
    hash.compare.mockResolvedValueOnce(true);
    jwtService.sign.mockReturnValueOnce('any_token');
    const result = await sut.handle(input);
    expect(result).toEqual({ user: mockUserInput(), accessToken: 'any_token' });
  });

  it('should call loadAccountByEmail with correct email', async () => {
    const email = 'any_email';
    await sut.handle({ email, password: 'any_password' });
    expect(userRepos.loadAccountByEmail).toHaveBeenCalledWith(email);
  });

  it('should call compare with correct values', async () => {
    userRepos.loadAccountByEmail.mockResolvedValueOnce({ ...mockUserInput() });
    const password = 'any_password';
    await sut.handle({ email: 'any_email', password });
    expect(hash.compare).toHaveBeenCalledWith({ value: password, hash: mockUserInput().password });
  });

  it('should call sign with correct id', async () => {
    const id = 'any_id';
    userRepos.loadAccountByEmail.mockResolvedValueOnce({ ...mockUserInput(), id });
    hash.compare.mockResolvedValueOnce(true);
    await sut.handle(input);
    expect(jwtService.sign).toHaveBeenCalledWith(id);
  });

  it('should throw if loadAccountByEmail throws', async () => {
    userRepos.loadAccountByEmail.mockRejectedValueOnce(new Error());
    const promise = sut.handle(input);
    await expect(promise).rejects.toThrow();
  });

  it('should throw if compare throws', async () => {
    userRepos.loadAccountByEmail.mockResolvedValueOnce(mockUserInput());
    hash.compare.mockRejectedValueOnce(new Error());
    const promise = sut.handle(input);
    await expect(promise).rejects.toThrow();
  });

  it('should throw if sign throws', async () => {
    userRepos.loadAccountByEmail.mockResolvedValueOnce(mockUserInput());
    hash.compare.mockResolvedValueOnce(true);
    jwtService.sign.mockImplementationOnce(() => {
      throw new Error();
    });
    const promise = sut.handle(input);
    await expect(promise).rejects.toThrow();
  });

  it('should throw if UnauthorizedException throws', async () => {
    userRepos.loadAccountByEmail.mockResolvedValueOnce(undefined);
    exceptionService.UnauthorizedException.mockImplementationOnce(() => {
      throw new Error();
    });
    const promise = sut.handle(input);
    await expect(promise).rejects.toThrow();
  });
});
