import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { LoggerMiddleware } from './logger/logger.middleware';

import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import emailConfig from '@config/emailConfig';
import authConfig from './config/authConfig';
import { validationSchema } from '@config/validationSchema';
import { UserModule } from './user/user.module';
import { EmailModule } from './email/email.module';
import { AuthModule } from '@auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './app.guard';
import { PhotoModule } from './photo/photo.module';
import { PhotometadataModule } from './photometadata/photometadata.module';
import { DataSource } from 'typeorm';

const configModule = ConfigModule.forRoot({
  load: [emailConfig, authConfig],
  isGlobal: true,
  validationSchema,
});

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'mysql',
        host: process.env.DATABASE_HOST,
        port: 3306,
        username: process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME,
        entities: ['dist/**/*.entity{.ts,.js}'],
        synchronize: process.env.DATABASE_SYNCHRONIZE === 'true',
        migrationsTableName: 'migrations',
        migrations: ['src/migration/*.ts'],
        logging: process.env.DATABASE_LOGGING === 'true',
      }),

      dataSourceFactory: async (options) => {
        const dataSource = await new DataSource(options).initialize();
        return dataSource;
      },
    }),
    configModule,
    UserModule,
    AuthModule,
    EmailModule,
    PhotoModule,
    PhotometadataModule,
  ],
  controllers: [],
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
