import { LoggerService } from '@/infra/logger/logger.service';
import { AllExceptionFilter } from '@/infra/common/filter/exception.filter';

const mockJson = jest.fn();
const mockStatus = jest.fn().mockImplementation(() => ({
  json: mockJson,
}));

const mockGetResponse = jest.fn().mockImplementation(() => ({
  status: mockStatus,
}));

const mockHttpArgumentsHost = jest.fn().mockImplementation(() => ({
  getResponse: mockGetResponse,
  getRequest: jest.fn().mockImplementation(() => ({
    url: 'http://localhost:3000',
  })),
}));

const mockArgumentsHost = {
  switchToHttp: mockHttpArgumentsHost,
  getArgByIndex: jest.fn(),
  getArgs: jest.fn(),
  getType: jest.fn(),
  switchToRpc: jest.fn(),
  switchToWs: jest.fn(),
};

describe('AllExceptionFilter', () => {
  let allExceptionFilter: AllExceptionFilter;
  let loggerService: LoggerService;

  beforeEach(async () => {
    loggerService = new LoggerService();
    allExceptionFilter = new AllExceptionFilter(loggerService);
  });

  it('should be defined', () => {
    expect(allExceptionFilter).toBeDefined();
  });

  it('should be defined', () => {
    expect(loggerService).toBeDefined();
  });

  it('should calls logMessage with correct params', () => {
    const request = {
      path: 'test',
      method: 'GET',
    };
    const message = {
      message: 'test',
      code: 'test',
    };
    const status = 500;
    const exception = new Error('test');
    const logMessageSpy = jest.spyOn(allExceptionFilter, 'logMessage');
    allExceptionFilter.logMessage(request, message, status, exception);
    expect(logMessageSpy).toHaveBeenCalledWith(request, message, status, exception);
  });

  it('should catch error', () => {
    const request = {
      url: 'http://localhost:3000',
    };
    const status = 500;
    const exception = new Error('test');
    const logMessageSpy = jest.spyOn(allExceptionFilter, 'logMessage');
    allExceptionFilter.catch(exception, mockArgumentsHost);
    expect(logMessageSpy).toHaveBeenCalledWith(request, { code: null, message: 'test' }, status, exception);
  });

  it('should calls logger.warn with correct params', () => {
    const request = {
      path: 'test',
      method: 'GET',
    };
    const message = {
      message: 'test',
      code: 'test',
    };
    const status = 400;
    const exception = new Error('test');
    const logMessageSpy = jest.spyOn(allExceptionFilter, 'logMessage');
    allExceptionFilter.logMessage(request, message, status, exception);
    expect(logMessageSpy).toHaveBeenCalledWith(request, message, status, exception);
  });
});
