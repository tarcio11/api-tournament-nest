import { CreateChallengeController, UpdateChallengeController } from '@/presentation/controllers/challenge';
import { adaptNestRouter } from '@/main/adapters/nest-router-adapter';
import { Body, Controller, HttpStatus, Param, Post, Put, Req, Res, UseGuards } from '@nestjs/common';
import { Response, RequestHandler } from 'express';
import { ApiNotFoundResponse, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { NotFoundError } from 'rxjs';
import { JwtGuard } from '@/infra/guards/jwt.guard';
import { UpdateChallengeValidation } from '@/main/validation';

@ApiTags('Desafios')
@Controller()
export class ChallengeRoutes {
  constructor(
    private readonly createChallengeController: CreateChallengeController,
    private readonly updateChallengeController: UpdateChallengeController,
  ) {}

  @Post('/challenges/:challenged_id')
  @UseGuards(JwtGuard)
  @ApiOperation({
    summary: 'Criar um novo desafio',
  })
  @ApiParam({
    name: 'challenged_id',
    type: String,
    format: 'uuid',
    description: 'Identificador do desafiado',
    example: 'f4f4f4f4-f4f4-f4f4-f4f4-f4f4f4f4f4f4',
  })
  @ApiResponse({ status: HttpStatus.NO_CONTENT })
  @ApiNotFoundResponse({
    description: 'Usuário não encontrado',
    type: NotFoundError,
  })
  async create(
    @Param('challenged_id') params: { user_id: string; challenged_id: string },
    @Req() request,
    @Res() response: Response,
  ): Promise<RequestHandler> {
    return adaptNestRouter(this.createChallengeController)(
      { user_id: request.user.id, challenged_id: params },
      response,
    );
  }

  @Put('/challenges')
  @UseGuards(JwtGuard)
  @ApiOperation({
    summary: 'Atualizar um desafio',
  })
  @ApiParam({
    name: 'challenged_id',
    type: String,
    format: 'uuid',
    description: 'Identificador do desafiado',
    example: 'f4f4f4f4-f4f4-f4f4-f4f4-f4f4f4f4f4f4',
  })
  @ApiResponse({ status: HttpStatus.NO_CONTENT })
  @ApiNotFoundResponse({
    description: 'Usuário não encontrado',
  })
  async update(@Req() request, @Body() body: UpdateChallengeValidation): Promise<void> {
    this.updateChallengeController.perform({ challenge: body, user_id: request.user.id });
  }
}
