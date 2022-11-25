import { Controller, UserAuthenticationController } from '@/presentation/controllers';
import { UserAuthenticationUseCaseAbstract } from '@/domain/use-cases';

import { mock, MockProxy } from 'jest-mock-extended';

describe('UserAuthenticationController', () => {
  let service: MockProxy<UserAuthenticationUseCaseAbstract>;
  let sut: UserAuthenticationController;

  beforeAll(() => {
    service = mock();
    service.handle.mockResolvedValueOnce({ token: 'any_token' });
  });

  beforeEach(() => {
    service = mock<UserAuthenticationUseCaseAbstract>();
    sut = new UserAuthenticationController(service);
  });

  it('should UserAuthenticationController extends Controller', async () => {
    expect(sut).toBeInstanceOf(Controller);
  });

  it('should call service with correct input', async () => {
    const input = { email: 'any_email', password: 'any_password' };
    await sut.perform(input);
  });

  it('should return 200 if service succeeds', async () => {
    const input = { email: 'any_email', password: 'any_password' };
    const httpResponse = await sut.perform(input);

    expect(httpResponse).toEqual({
      statusCode: 200,
      data: undefined,
    });
  });
});
