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
  // Apply the ValidationPipe globally in our main.ts file :
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      //  top a request if any non-white listed properties are present :
      forbidNonWhitelisted: true,
      // transform payloads on an instance of their dto and transform type url (ex string on number if it is requested):
      transform: true,
      // avoid use @type decorator on DTO --disable dto type :
      // be careful if true allow a number value on payload for a string value type dto
      transformOptions: {
        enableImplicitConversion: false,
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
