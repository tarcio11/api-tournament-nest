import { ExceptionsService } from '@/infra/exceptions/exceptions.service';
import { BadRequestException, ForbiddenException, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';

describe('ExceptionsService', () => {
  let service: ExceptionsService;

  beforeEach(async () => {
    service = new ExceptionsService();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be throw badRequestException', () => {
    const data = { message: 'error', code: '400' };
    expect(() => service.badRequestException(data)).toThrowError(BadRequestException);
  });

  it('should be throw internalServerErrorException', () => {
    const data = { message: 'error', code: '500' };
    expect(() => service.internalServerErrorException(data)).toThrowError(InternalServerErrorException);
  });

  it('should be throw forbiddenException', () => {
    const data = { message: 'error', code: '403' };
    expect(() => service.forbiddenException(data)).toThrowError(ForbiddenException);
  });

  it('should be throw UnauthorizedException', () => {
    const data = { message: 'error', code: '401' };
    expect(() => service.UnauthorizedException(data)).toThrowError(UnauthorizedException);
  });
});
