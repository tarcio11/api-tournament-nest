import { Controller } from '@/presentation/controllers';
import { ShowProfileController } from '@/presentation/controllers/user';
import { ShowProfileUseCaseAbstract } from '@/domain/use-cases';

import { mock, MockProxy } from 'jest-mock-extended';

describe('ShowProfileController', () => {
  let createUser: MockProxy<ShowProfileUseCaseAbstract>;
  let sut: ShowProfileController;
  let httpRequest: any;

  const input = { id: 'any_id' };

  beforeAll(() => {
    createUser = mock();
    createUser.handle.mockResolvedValue(input);
  });

  beforeEach(() => {
    sut = new ShowProfileController(createUser);
    httpRequest = input;
  });

  test('should ShowProfileController extends Controller', async () => {
    expect(sut).toBeInstanceOf(Controller);
  });

  test('should call ShowProfileController with correct input', async () => {
    await sut.perform(httpRequest);

    expect(createUser.handle).toHaveBeenCalledWith({
      id: httpRequest.id,
    });
  });

  it('should return 200 if ShowProfile succeeds', async () => {
    const httpResponse = await sut.perform(httpRequest);

    expect(httpResponse).toEqual({
      statusCode: 200,
      data: input,
    });
  });
});
