import { Controller } from '@/presentation/controllers';
import { UserData } from '@/domain/entities';
import { badRequest, created } from '@/presentation/helpers/http';
import { AddUserAccountUseCaseAbstract } from '@/domain/use-cases';

import { Injectable } from '@nestjs/common';

@Injectable()
export class CreateUserController extends Controller {
  constructor(private readonly service: AddUserAccountUseCaseAbstract) {
    super();
  }

  async perform(input: UserData): Promise<Controller.Output> {
    try {
      const httpResponse = await this.service.handle(input);
      return created(httpResponse);
    } catch (error: any) {
      if (error.response.code === '400') return badRequest(error);
      throw error;
    }
  }
}
