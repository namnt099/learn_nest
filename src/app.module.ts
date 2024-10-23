import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';

import { UserModule } from './user/user.module';
import { BookmarkModule } from './bookmark/bookmark.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { AllExceptionsFilter } from './common/http.exception.filter';
import { LoggingInterceptor } from './common/logging.interceptor';
import { TransformInterceptor } from './common/transform.interceptor';


@Module({
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    }, {
      provide: APP_INTERCEPTOR, useClass: LoggingInterceptor,
    },
    {
      provide: APP_INTERCEPTOR, useClass: TransformInterceptor,
    },
  ],

  imports: [ConfigModule.forRoot({ isGlobal: true }), AuthModule, UserModule, BookmarkModule, PrismaModule],

})
export class AppModule { }
