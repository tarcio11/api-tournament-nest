import { ServerError } from '@/presentation/exceptions';
import { Controller } from '@/presentation/controllers/controller';
import { HttpResponse } from '@/presentation/helpers';

class ControllerStub extends Controller {
  result: HttpResponse = {
    statusCode: 200,
    data: 'any_data',
  };

  async perform(input: any): Promise<HttpResponse> {
    return this.result;
  }
}

describe('Controller', () => {
  let sut: ControllerStub;

  beforeEach(() => {
    sut = new ControllerStub();
  });

  it('should ControllerStub extends Controller', () => {
    expect(sut).toBeInstanceOf(Controller);
  });

  it('should return 500 if perform throws', async () => {
    const error = new Error('any_error');
    jest.spyOn(sut, 'perform').mockRejectedValueOnce(error);

    const httpResponse = await sut.handle({ data: 'any_data' });

    expect(httpResponse).toEqual({
      statusCode: 500,
      data: new ServerError(error),
    });
  });

  it('should return 200 if perform succeeds', async () => {
    const httpResponse = await sut.handle({ data: 'any_data' });

    expect(httpResponse).toEqual({
      statusCode: 200,
      data: 'any_data',
    });
  });
});
