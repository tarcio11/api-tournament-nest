import { CreateUserController, ListUsersController, UserAuthenticationController } from '@/presentation/controllers';
import { adaptNestRouter } from '@/main/adapters/nest-router-adapter';
import { UserAuthenticationValidation, UserValidation } from '@/main/validation';
import {
  HttpRestApiModelUserAuthenticationBody,
  HttpRestApiResponseUser,
  HttpRestApiModelCreateUserBody,
} from '@/main/docs/user';
import { Body, Controller, Get, HttpStatus, Post, Req, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from '@/infra/guards/jwt.guard';

@ApiTags('Usuários')
@Controller()
export class UserRoutes {
  constructor(
    private readonly createUserController: CreateUserController,
    private readonly listUserController: ListUsersController,
    private readonly userAuthenticationController: UserAuthenticationController,
  ) {}

  @Post('/users')
  @ApiBody({ type: HttpRestApiModelCreateUserBody })
  @ApiResponse({ status: HttpStatus.CREATED, type: HttpRestApiResponseUser })
  async create(@Body() body: UserValidation, @Res() response: Response): Promise<Response> {
    return adaptNestRouter(this.createUserController)(body, response);
  }

  @Get('/users')
  @UseGuards(JwtGuard)
  @ApiOperation({
    summary: 'Listar todos os usuários',
  })
  @ApiResponse({ status: HttpStatus.OK, type: [HttpRestApiResponseUser] })
  async list(@Res() response: Response): Promise<Response> {
    return adaptNestRouter(this.listUserController)({}, response);
  }

  @Post('/users/signin')
  @ApiBody({ type: HttpRestApiModelUserAuthenticationBody })
  @ApiResponse({ status: HttpStatus.OK, type: HttpRestApiResponseUser })
  async signin(@Body() body: UserAuthenticationValidation, @Res() response: Response): Promise<Response> {
    return adaptNestRouter(this.userAuthenticationController)(body, response);
  }
}
