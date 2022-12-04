import { CreateMatchController } from '@/presentation/controllers/match';
import { adaptNestRouter } from '@/main/adapters/nest-router-adapter';
import { Body, Controller, HttpStatus, Param, Post, Res, UseGuards } from '@nestjs/common';
import { Response, RequestHandler } from 'express';
import { ApiNotFoundResponse, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { NotFoundError } from 'rxjs';
import { JwtGuard } from '@/infra/guards/jwt.guard';

@ApiTags('Partidas')
@Controller()
export class MatchRoutes {
  constructor(private readonly createMatchController: CreateMatchController) {}

  @Post('/matches/:challenged_id')
  @UseGuards(JwtGuard)
  @ApiOperation({
    summary: 'Criar uma nova partida',
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
    @Param('challenged_id') params: { challenged_id: string },
    @Body() body: any,
    @Res() response: Response,
  ): Promise<RequestHandler> {
    return adaptNestRouter(this.createMatchController)({ match: body, challenged_id: params }, response);
  }
}
