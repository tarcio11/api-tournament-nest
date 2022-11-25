export interface IFormatExceptionMessage {
  message: string;
  code: string;
}

export abstract class IException {
  abstract badRequestException(data: IFormatExceptionMessage): IException;
  abstract internalServerErrorException(data?: IFormatExceptionMessage): IException;
  abstract forbiddenException(data?: IFormatExceptionMessage): IException;
  abstract UnauthorizedException(data?: IFormatExceptionMessage): IException;
}
