import { Controller } from '@/presentation/controllers';
import { noContent, unauthorized } from '@/presentation/helpers/http';
import { CreateChallengeUseCaseAbstract } from '@/domain/use-cases';
import { Gateway } from '@/main/routes/websocket/gateway';

import { Injectable } from '@nestjs/common';

@Injectable()
export class CreateChallengeController extends Controller {
  constructor(private readonly service: CreateChallengeUseCaseAbstract, private readonly ws: Gateway) {
    super();
  }

  async perform(input: CreateChallengeController.Input): Promise<Controller.Output> {
    try {
      const challenge = await this.service.handle(input);
      this.ws.sendInvateChallenge(input.challenged_id, challenge);
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
