import { IException, IFormatExceptionMessage } from '@/domain/exceptions';

import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class ExceptionsService implements IException {
  badRequestException(data: IFormatExceptionMessage): IException {
    throw new BadRequestException(data);
  }
  internalServerErrorException(data?: IFormatExceptionMessage): IException {
    throw new InternalServerErrorException(data);
  }
  forbiddenException(data?: IFormatExceptionMessage): IException {
    throw new ForbiddenException(data);
  }
  UnauthorizedException(data?: IFormatExceptionMessage): IException {
    throw new UnauthorizedException(data);
  }
}
