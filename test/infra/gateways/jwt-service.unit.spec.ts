import { JwtService } from '@/infra/gateways';

jest.mock('jsonwebtoken', () => ({
  sign(): string {
    return 'any_hash';
  },
}));

describe('JwtService', () => {
  let service: JwtService;

  beforeEach(async () => {
    service = new JwtService();
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
