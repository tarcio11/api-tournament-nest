import { JwtService } from '@/infra/gateways';
import { JwtService as Jwt } from '@nestjs/jwt';
import { mock, MockProxy } from 'jest-mock-extended';

describe('JwtService', () => {
  let service: JwtService;
  let jwt: MockProxy<Jwt>;

  beforeEach(async () => {
    jwt = mock<Jwt>();
    service = new JwtService(jwt);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should call sign with correct params', () => {
    const signSpy = jest.spyOn(service, 'sign');
    service.sign('any_id');
    expect(signSpy).toHaveBeenCalledWith('any_id');
  });

  it('should return a valid id', async () => {
    jwt.sign.mockReturnValueOnce('any_hash');
    const hash = service.sign('any_id');
    expect(hash).toBe('any_hash');
  });

  it('should throw if sign throws', () => {
    jest.spyOn(service, 'sign').mockImplementationOnce(() => {
      throw new Error();
    });
    expect(service.sign).toThrow();
  });
});
