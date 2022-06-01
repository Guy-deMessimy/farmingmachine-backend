import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { ApiKeyGuard } from './guards/api-key.guard';
import { LoggingMiddleware } from './middleware/logging.middleware';

@Module({
  imports: [ConfigModule],
  providers: [{ provide: APP_GUARD, useClass: ApiKeyGuard }],
})
export class CommonModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // apply logging middleware on every routes with * wildcard
    consumer.apply(LoggingMiddleware).forRoutes('*');
    // apply logging middleware on routes with user prefix
    // consumer.apply(LoggingMiddleware).forRoutes('user');
    // apply logging middleware on routes with specific method
    // consumer
    //   .apply(LoggingMiddleware)
    //   .forRoutes({ path: 'users', method: RequestMethod.GET });
    // exclude routes
    // consumer.apply(LoggingMiddleware).exclude('users').forRoutes('*');
  }
}
