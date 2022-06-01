import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { Observable } from 'rxjs';
@Injectable()
export class ApiKeyGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const configService = new ConfigService();
    const apiKey = configService.get<string>('API_KEY');
    console.log(apiKey);
    const request = context.switchToHttp().getRequest<Request>();
    const authHeader = request.header('Authorization');
    // return false;
    // return authHeader === process.env.API_KEY;
    // use ConfigService Instead
    return authHeader === apiKey;
  }
}
