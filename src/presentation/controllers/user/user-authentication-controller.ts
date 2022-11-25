import { Controller } from '@/presentation/controllers';
import { unauthorized, ok } from '@/presentation/helpers/http';
import { UserAuthenticationUseCaseAbstract } from '@/domain/use-cases';

import { Injectable } from '@nestjs/common';

@Injectable()
export class UserAuthenticationController extends Controller {
  constructor(private readonly service: UserAuthenticationUseCaseAbstract) {
    super();
  }

  async perform(input: UserAuthenticationControllerModel.Input): Promise<Controller.Output> {
    try {
      const httpResponse = await this.service.handle(input);
      return ok(httpResponse);
    } catch (error: any) {
      if (error.response.code === '401') return unauthorized(error);
      throw error;
    }
  }
}

export namespace UserAuthenticationControllerModel {
  export type Input = {
    email: string;
    password: string;
  };
}
