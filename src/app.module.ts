import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { LoggerMiddleware } from './logger/logger.middleware';

import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import emailConfig from './config/emailConfig';
import { validationScheme } from './config/validationSchema';
import { MoviesModule } from './movies/movies.module';
import { UserModule } from './user/user.module';
import { EmailModule } from './email/email.module';
import { SubModule } from './sub/sub.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './app.guard';

const configModule = ConfigModule.forRoot({
  envFilePath: [`${__dirname}/config/env/.${process.env.NODE_ENV}.env`],
  load: [emailConfig],
  isGlobal: true,
});

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    configModule,
    MoviesModule,
    UserModule,
    EmailModule,
    SubModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(LoggerMiddleware).forRoutes('/user');
  }
}
