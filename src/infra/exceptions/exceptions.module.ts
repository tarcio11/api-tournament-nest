import { ExceptionsService } from '@/infra/exceptions/exceptions.service';
import { IException } from '@/domain/exceptions';

import { Module } from '@nestjs/common';

@Module({
  providers: [ExceptionsService, { provide: IException, useExisting: ExceptionsService }],
  exports: [IException],
})
export class ExceptionsModule {}
