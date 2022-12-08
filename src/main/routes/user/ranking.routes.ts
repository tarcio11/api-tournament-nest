import { ShowRankingController } from '@/presentation/controllers/ranking';
import { adaptNestRouter } from '@/main/adapters/nest-router-adapter';
import { Controller, Get, Res } from '@nestjs/common';
import { Response, RequestHandler } from 'express';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Ranking')
@Controller()
export class RankingRoutes {
  constructor(private readonly showRankingController: ShowRankingController) {}

  @Get('/rankings')
  async show(@Res() response: Response): Promise<RequestHandler> {
    return adaptNestRouter(this.showRankingController)({}, response);
  }
}
