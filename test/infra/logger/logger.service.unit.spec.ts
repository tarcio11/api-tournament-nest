import { LoggerService } from '@/infra/logger/logger.service';

describe('LoggerService', () => {
  let sut: LoggerService;

  beforeEach(() => {
    sut = new LoggerService();
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
  });

  it('should call debug with correct values', () => {
    const debugSpy = jest.spyOn(sut, 'debug');
    sut.debug('context', 'message');
    expect(debugSpy).toHaveBeenCalledWith('context', 'message');
  });

  it('should call log with correct values', () => {
    const logSpy = jest.spyOn(sut, 'log');
    sut.log('context', 'message');
    expect(logSpy).toHaveBeenCalledWith('context', 'message');
  });

  it('should call error with correct values', () => {
    const errorSpy = jest.spyOn(sut, 'error');
    sut.error('context', 'message');
    expect(errorSpy).toHaveBeenCalledWith('context', 'message');
  });

  it('should call warn with correct values', () => {
    const warnSpy = jest.spyOn(sut, 'warn');
    sut.warn('context', 'message');
    expect(warnSpy).toHaveBeenCalledWith('context', 'message');
  });

  it('should call verbose with correct values', () => {
    const verboseSpy = jest.spyOn(sut, 'verbose');
    sut.verbose('context', 'message');
    expect(verboseSpy).toHaveBeenCalledWith('context', 'message');
  });
});
