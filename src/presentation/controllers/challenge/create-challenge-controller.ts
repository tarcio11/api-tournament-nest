import { Controller } from '@/presentation/controllers';
import { noContent, unauthorized } from '@/presentation/helpers/http';
import { CreateChallengeUseCaseAbstract } from '@/domain/use-cases';

import { Injectable } from '@nestjs/common';

@Injectable()
export class CreateChallengeController extends Controller {
  constructor(private readonly service: CreateChallengeUseCaseAbstract) {
    super();
  }

  async perform(input: CreateChallengeController.Input): Promise<Controller.Output> {
    try {
      await this.service.handle(input);
      return noContent();
    } catch (error: any) {
      if (error.response.code === '401') return unauthorized(error);
      throw error;
    }
  }
}

namespace CreateChallengeController {
  export type Input = {
    user_id: string;
    challenged_id: string;
  };
}
