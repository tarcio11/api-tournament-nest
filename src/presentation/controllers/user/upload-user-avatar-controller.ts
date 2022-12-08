import { Controller } from '@/presentation/controllers';
import { badRequest, created } from '@/presentation/helpers/http';
import { UploadUserAvatarUseCaseAbstract } from '@/domain/use-cases';

import { Injectable } from '@nestjs/common';
import { User } from '@/domain/entities';

@Injectable()
export class UploadUserAvatarController extends Controller {
  constructor(private readonly service: UploadUserAvatarUseCaseAbstract) {
    super();
  }

  async perform(input: UploadUserAvatarController.Input): Promise<Controller.Output> {
    try {
      const httpResponse = await this.service.handle(input);
      delete httpResponse.password;
      return created(httpResponse);
    } catch (error: any) {
      if (error.response.code === '400') return badRequest(error);
      throw error;
    }
  }
}

export namespace UploadUserAvatarController {
  export type Input = {
    user: User;
    avatar: Express.Multer.File;
  };
}
