import { Controller } from '@/presentation/controllers';
import { UserData } from '@/domain/entities';
import { ok } from '@/presentation/helpers/http';
import { ListUserAccountUseCaseAbstract } from '@/domain/use-cases';

import { Injectable } from '@nestjs/common';

@Injectable()
export class ListUsersController extends Controller {
  constructor(private readonly service: ListUserAccountUseCaseAbstract) {
    super();
  }

  async perform(): Promise<Controller.Output> {
    try {
      const httpResponse = await this.service.handle({});
      return ok(httpResponse);
    } catch (error) {
      throw error;
    }
  }
}

export namespace ListUsersController {
  export type Input = UserData[];
}
