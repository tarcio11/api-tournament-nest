import { LoggerService } from '@/infra/logger/logger.service';
import { ILogger } from '@/domain/logger';

import { Module } from '@nestjs/common';

@Module({
  providers: [LoggerService, { provide: ILogger, useExisting: LoggerService }],
  exports: [ILogger],
})
export class LoggerModule {}
