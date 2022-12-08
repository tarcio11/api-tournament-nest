import { Controller } from '@/presentation/controllers';
import { noContent } from '@/presentation/helpers/http';
import { UpdateChallengeUseCaseAbstract } from '@/domain/use-cases';

import { Injectable } from '@nestjs/common';

@Injectable()
export class UpdateChallengeController extends Controller {
  constructor(private readonly service: UpdateChallengeUseCaseAbstract) {
    super();
  }

  async perform(input: UpdateChallengeController.Input): Promise<Controller.Output> {
    try {
      await this.service.handle(input);
      return noContent();
    } catch (error: any) {
      throw error;
    }
  }
}

namespace UpdateChallengeController {
  export type Input = {
    user_id: string;
    challenge: {
      id: string;
      status: string;
    };
  };
}
