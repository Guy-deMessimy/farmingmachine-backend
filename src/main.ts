import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaService } from './prisma/prisma.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Apply the ValidationPipe globally in our main.ts file :
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      //  top a request if any non-white listed properties are present :
      forbidNonWhitelisted: true,
      // transform a payload on an instance of his dto gloabally and transform type url (ex string on number if it is requested):
      transform: true,
      // avoid use @type decorator on DTO :
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  const prismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);
  await app.listen(3000);
}
bootstrap();
