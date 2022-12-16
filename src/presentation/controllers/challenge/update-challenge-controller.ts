import { Controller } from '@/presentation/controllers';
import { noContent } from '@/presentation/helpers/http';
import { UpdateChallengeUseCaseAbstract } from '@/domain/use-cases';

import { Injectable } from '@nestjs/common';
import { Gateway } from '@/main/routes/websocket/gateway';

@Injectable()
export class UpdateChallengeController extends Controller {
  constructor(private readonly service: UpdateChallengeUseCaseAbstract, private readonly ws: Gateway) {
    super();
  }

  async perform(input: UpdateChallengeController.Input): Promise<Controller.Output> {
    try {
      const challenge = await this.service.handle(input);
      this.ws.sendChallengeAccepted([challenge.user_id, challenge.challenged_id], challenge);
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
