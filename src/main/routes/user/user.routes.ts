import {
  CreateUserController,
  ListUsersController,
  UserAuthenticationController,
  ShowProfileController,
  FindByIdController,
  UploadUserAvatarController,
} from '@/presentation/controllers/user';
import { adaptNestRouter } from '@/main/adapters/nest-router-adapter';
import { UserAuthenticationValidation, UserValidation } from '@/main/validation';
import {
  HttpRestApiModelUserAuthenticationBody,
  HttpRestApiResponseUser,
  HttpRestApiModelCreateUserBody,
} from '@/main/docs/user';
import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Req,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Response } from 'express';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from '@/infra/guards/jwt.guard';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('Usuários')
@Controller()
export class UserRoutes {
  constructor(
    private readonly createUserController: CreateUserController,
    private readonly listUserController: ListUsersController,
    private readonly userAuthenticationController: UserAuthenticationController,
    private readonly showProfileController: ShowProfileController,
    private readonly findByIdController: FindByIdController,
    private readonly uploadUserAvatarController: UploadUserAvatarController,
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

  @Get('/users/me')
  @UseGuards(JwtGuard)
  @ApiOperation({
    summary: 'Mostrar perfil do usuário',
  })
  @ApiResponse({ status: HttpStatus.OK, type: HttpRestApiResponseUser })
  async me(@Req() request, @Res() response: Response): Promise<Response> {
    return adaptNestRouter(this.showProfileController)(request.user, response);
  }

  @Get('/users/:id')
  @UseGuards(JwtGuard)
  @ApiOperation({
    summary: 'Buscar usuário por ID',
  })
  @ApiResponse({ status: HttpStatus.OK, type: HttpRestApiResponseUser })
  async findById(@Param('id') id: string, @Res() response: Response): Promise<Response> {
    return adaptNestRouter(this.findByIdController)({ id }, response);
  }

  @Patch('/users/me/avatar')
  @UseInterceptors(FileInterceptor('avatar'))
  @UseGuards(JwtGuard)
  @ApiOperation({
    summary: 'Atualizar avatar do usuário',
  })
  @ApiResponse({ status: HttpStatus.OK, type: HttpRestApiResponseUser })
  async updateAvatar(
    @UploadedFile() avatar: Express.Multer.File,
    @Req() request,
    @Res() response: Response,
  ): Promise<any> {
    return adaptNestRouter(this.uploadUserAvatarController)({ avatar, user: request.user }, response);
  }
}
