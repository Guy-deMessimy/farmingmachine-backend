import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { ApiKeyGuard } from './common/guards/api-key.guard';
import { TimeoutInterceptor } from './common/interceptors/timeout.interceptor';
import { WrapResponseInterceptor } from './common/interceptors/wrap-response.interceptor';
import { PrismaService } from './prisma/prisma.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ensuring all endpoints are protected from receiving incorrect data
  app.useGlobalPipes(
    new ValidationPipe({
      // have error message in case of incorrect request
      disableErrorMessages: false,
      // filter out properties that should not be received by the method handler and removed it
      whitelist: true,
      //  stop a request if any non-white listed properties are present
      forbidNonWhitelisted: false,
      // transform payloads on an instance of their dto
      transform: true,
      // perform conversion of primitive types comes from the network (ex request id = string to number)
      // if true @type on DTO can be disable
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  const prismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);

  app.useGlobalFilters(new HttpExceptionFilter());
  // disable globally method if class injection exist
  // app.useGlobalGuards(new ApiKeyGuard());
  app.useGlobalInterceptors(
    new WrapResponseInterceptor(),
    // decomment to illustrate useGlobalFilters purpose
    // new TimeoutInterceptor(),
  );

  // Setting up Swagger document
  const options = new DocumentBuilder()
    .setTitle('FarmingMachine')
    .setDescription('farming application')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
