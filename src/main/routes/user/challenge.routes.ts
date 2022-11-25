import { CreateChallengeController } from '@/presentation/controllers/challenge/create-challenge-controller';
import { adaptNestRouter } from '@/main/adapters/nest-router-adapter';
import { Controller, HttpStatus, Param, Post, Res } from '@nestjs/common';
import { Response, RequestHandler } from 'express';
import { ApiNotFoundResponse, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { NotFoundError } from 'rxjs';

@ApiTags('Desafios')
@Controller()
export class ChallengeRoutes {
  constructor(private readonly createChallengeController: CreateChallengeController) {}

  @Post('/challenges/:user_id')
  @ApiOperation({
    summary: 'Criar um novo desafio',
  })
  @ApiParam({
    name: 'user_id',
    type: String,
    format: 'uuid',
    description: 'Identificador do usuário',
    example: 'f4f4f4f4-f4f4-f4f4-f4f4-f4f4f4f4f4f4',
  })
  @ApiResponse({ status: HttpStatus.NO_CONTENT })
  @ApiNotFoundResponse({
    description: 'Usuário não encontrado',
    type: NotFoundError,
  })
  async create(@Param('user_id') params: { user_id: string }, @Res() response: Response): Promise<RequestHandler> {
    return adaptNestRouter(this.createChallengeController)(params, response);
  }
}
