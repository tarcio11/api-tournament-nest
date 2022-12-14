import { Controller } from '@/presentation/controllers';
import { noContent, unauthorized } from '@/presentation/helpers/http';
import {
  CreateMatchUseCaseAbstract,
  CreateRankingUseCaseAbstract,
  FindOneChallengeUseCaseAbstract,
  ShowRankingUseCaseAbstract,
  UpdateChallengeUseCaseAbstract,
} from '@/domain/use-cases';

import { Injectable } from '@nestjs/common';
import { Gateway } from '@/main/routes/websocket/gateway';

@Injectable()
export class CreateMatchController extends Controller {
  constructor(
    private readonly FindOnechallengeService: FindOneChallengeUseCaseAbstract,
    private readonly service: CreateMatchUseCaseAbstract,
    private readonly updateChallengeService: UpdateChallengeUseCaseAbstract,
    private readonly createRakingService: CreateRankingUseCaseAbstract,
    private readonly updateRankingEvent: ShowRankingUseCaseAbstract,
    private readonly ws: Gateway,
  ) {
    super();
  }

  async perform(input: CreateMatchController.Input): Promise<Controller.Output> {
    try {
      const challenge = await this.FindOnechallengeService.handle({ challenged_id: input.challenged_id });
      await this.service.handle({ challenge, match: input.match });
      await this.updateChallengeService.handle({ challenge: { id: input.challenged_id, status: 'FINISHED' } });
      await this.createRakingService.handle({ player: input.match });
      const rankings = await this.updateRankingEvent.handle({});
      this.ws.sendRankingUpdate(rankings);
      return noContent();
    } catch (error: any) {
      if (error.response.code === '401') return unauthorized(error);
      throw error;
    }
  }
}

namespace CreateMatchController {
  export type Input = {
    match: {
      playWinner_id: string;
      playLoser_id: string;
      scoreWinner: number;
      scoreLoser: number;
      draw: boolean;
    };
    challenged_id: string;
  };
}
