import { Controller } from '@/presentation/controllers';
import { ok } from '@/presentation/helpers/http';
import { FindByIdUseCaseAbstract } from '@/domain/use-cases';
import { Input as Params } from '@/domain/use-cases/user/show-profile';

import { Injectable } from '@nestjs/common';

@Injectable()
export class FindByIdController extends Controller {
  constructor(private readonly service: FindByIdUseCaseAbstract) {
    super();
  }

  async perform({ id }: FindByIdController.Input): Promise<Controller.Output> {
    try {
      const httpResponse = await this.service.handle({ id });

      return ok(httpResponse);
    } catch (error) {
      throw error;
    }
  }
}

export namespace FindByIdController {
  export type Input = Params;
}
