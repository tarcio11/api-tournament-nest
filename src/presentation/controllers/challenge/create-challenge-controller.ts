import { Controller } from '@/presentation/controllers';
import { noContent } from '@/presentation/helpers/http';
import { CreateChallengeUseCaseAbstract } from '@/domain/use-cases';

import { Injectable } from '@nestjs/common';

@Injectable()
export class CreateChallengeController extends Controller {
  constructor(private readonly service: CreateChallengeUseCaseAbstract) {
    super();
  }

  async perform(input: CreateChallengeController.Input): Promise<Controller.Output> {
    console.log('input', input);

    try {
      await this.service.handle(input);
      return noContent();
    } catch (error: any) {
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
