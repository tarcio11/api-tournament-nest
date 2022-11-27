import { Controller } from '@/presentation/controllers';
import { CreateUserController } from '@/presentation/controllers/user';
import { AddUserAccountUseCaseAbstract } from '@/domain/use-cases';
import { User } from '@/domain/entities';
import { mock, MockProxy } from 'jest-mock-extended';

describe('CreateUserController', () => {
  let createUser: MockProxy<AddUserAccountUseCaseAbstract>;
  let sut: CreateUserController;
  let httpRequest: any;

  const userInput = new User({ name: 'any_name', email: 'any_email', password: 'any_password' });

  beforeAll(() => {
    createUser = mock();
    createUser.handle.mockResolvedValue(userInput);
  });

  beforeEach(() => {
    sut = new CreateUserController(createUser);
    httpRequest = userInput;
  });

  test('should CreateUserController extends Controller', async () => {
    expect(sut).toBeInstanceOf(Controller);
  });

  test('should call CreateUserController with correct input', async () => {
    await sut.perform(httpRequest);

    expect(createUser.handle).toHaveBeenCalledWith({
      name: httpRequest.name,
      email: httpRequest.email,
      password: httpRequest.password,
    });
  });

  it('should return 201 if CreateUser succeeds', async () => {
    const httpResponse = await sut.perform(httpRequest);

    expect(httpResponse).toEqual({
      statusCode: 201,
      data: userInput,
    });
  });
});
