import { Controller } from '@/presentation/controllers';
import { ok } from '@/presentation/helpers/http';
import { ShowProfileUseCaseAbstract } from '@/domain/use-cases';
import { Input as Params } from '@/domain/use-cases/user/show-profile';

import { Injectable } from '@nestjs/common';

@Injectable()
export class ShowProfileController extends Controller {
  constructor(private readonly service: ShowProfileUseCaseAbstract) {
    super();
  }

  async perform({ id }: ShowProfileController.Input): Promise<Controller.Output> {
    try {
      const httpResponse = await this.service.handle({ id });

      return ok(httpResponse);
    } catch (error) {
      throw error;
    }
  }
}

export namespace ShowProfileController {
  export type Input = Params;
}
