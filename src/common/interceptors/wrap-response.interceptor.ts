import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';

@Injectable()
export class WrapResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('Interceptors: Before...');

    // to illustrate lifecycle request / response purpose
    // return next.handle().pipe(tap((data) => console.log('Interceptors: After...', data)));
    return next.handle().pipe(map((data) => ({ data })));
  }
}
