import { Controller } from '@/presentation/controllers';
import { ok, unauthorized } from '@/presentation/helpers/http';
import { ShowRankingUseCaseAbstract } from '@/domain/use-cases';

import { Injectable } from '@nestjs/common';

@Injectable()
export class ShowRankingController extends Controller {
  constructor(private readonly service: ShowRankingUseCaseAbstract) {
    super();
  }

  async perform(): Promise<Controller.Output> {
    try {
      const rankings = await this.service.handle({});
      return ok(rankings);
    } catch (error: any) {
      if (error.response.code === '401') return unauthorized(error);
      throw error;
    }
  }
}
