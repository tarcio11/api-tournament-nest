import { Controller } from '@/presentation/controllers';
import { noContent } from '@/presentation/helpers/http';
import { CreateChallengeUseCaseAbstract } from '@/domain/use-cases';

import { Injectable } from '@nestjs/common';

@Injectable()
export class CreateChallengeController extends Controller {
  constructor(private readonly service: CreateChallengeUseCaseAbstract) {
    super();
  }

  async perform(user_id: string): Promise<Controller.Output> {
    try {
      await this.service.handle(user_id);
      return noContent();
    } catch (error: any) {
      throw error;
    }
  }
}
