import { NestFactory } from '@nestjs/core';
import { AppModule } from '@/main/factories';
import { PgConnection } from '@/infra/database/pg/repos/helpers/connection';
import { AllExceptionFilter } from '@/infra/common/filter/exception.filter';
import { LoggerService } from '@/infra/logger/logger.service';
import { ResponseInterceptor } from '@/infra/common/interceptors/response.interceptor';
import { LoggingInterceptor } from '@/infra/common/interceptors/logger.interceptor';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {});
  app.enableCors({
    origin: '*',
  });
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new AllExceptionFilter(new LoggerService()));
  app.useGlobalInterceptors(new LoggingInterceptor(new LoggerService()));
  app.useGlobalInterceptors(new ResponseInterceptor());
  app.setGlobalPrefix('api/v1');

  const options = new DocumentBuilder()
    .setTitle('Documentation')
    .setDescription('Api Documentation')
    .setVersion('1.0.0')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api/docs', app, document);
  SwaggerModule.setup('/', app, document);

  PgConnection.getInstance()
    .connect()
    .then(async () => {
      await app.listen(3000);
    })
    .catch(console.error);
}

bootstrap().catch((e) => console.log('error', e));
