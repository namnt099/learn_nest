import { Injectable, NestInterceptor, ExecutionContext, CallHandler, Body } from '@nestjs/common';
import e from 'express';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { prettyJson } from './pretty.json';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const reqHeaders = context.switchToHttp().getRequest().headers;
        const reqBody = context.switchToHttp().getRequest().body;
        const reqPar = context.switchToHttp().getRequest().params;

        console.log('Logging the incoming request:', prettyJson(reqHeaders));
        console.log('Logging the incoming req body:', prettyJson(reqBody));
        console.log('Logging the incoming req params:', prettyJson(reqPar));

        const now = Date.now();
        return next
            .handle()
            .pipe(
                tap({
                    next: () => console.log(`After... ${Date.now() - now}ms`),
                    error(err) {
                        console.error(prettyJson(err));
                        console.log(`After... ${Date.now() - now}ms`);
                    },
                }),
            );
    }
}
