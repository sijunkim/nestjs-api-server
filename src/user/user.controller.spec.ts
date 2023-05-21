import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Photo } from '../photo/entities/photo.entity';
import { PhotoMetadata } from '../photometadata/entities/photometadata.entity';
import { EmailService } from '../email/email.service';
import { AuthService } from '../auth/auth.service';
import { PhotoService } from '../photo/photo.service';
import { ConfigModule } from '@nestjs/config';
import { DataSource } from 'typeorm';
import emailConfig from '../config/emailConfig';
import authConfig from '../config/authConfig';
import { validationSchema } from '../config/validationSchema';

describe('user controller', () => {
  let userController: UserController;

  beforeEach(async () => {
    const configModule = ConfigModule.forRoot({
      load: [emailConfig, authConfig],
      isGlobal: true,
      validationSchema,
    });
    const app: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRootAsync({
          useFactory: () => ({
            type: 'mysql',
            host: process.env.DATABASE_HOST,
            port: 3306,
            username: process.env.DATABASE_USERNAME,
            password: process.env.DATABASE_PASSWORD,
            database: process.env.DATABASE_NAME,
            entities: ['src/**/*.entity{.ts,.js}'],
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
        TypeOrmModule.forFeature([User, Photo, PhotoMetadata]),
        configModule,
      ],
      controllers: [UserController],
      providers: [UserService, EmailService, AuthService, PhotoService],
    }).compile();

    userController = app.get<UserController>(UserController);
  });

  describe('user controller', () => {
    test('/:id', async () => {
      const header = {
        authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImtpbXNpanVuIiwibmFtZSI6Iuq5gOyLnOykgCIsImVtYWlsIjoicGFwYXlhOTM0OUBuYXZlci5jb20iLCJpYXQiOjE2ODM5OTc1NTIsImV4cCI6MTY4NjU4OTU1MiwiYXVkIjoiZXhhbXBsZS5jb20iLCJpc3MiOiJleGFtcGxlLmNvbSJ9.rCZinpd7K9T1TP5xlfe1HM3ZYxsZwpDB-4T9Qcqab_Q',
        'user-agent': 'PostmanRuntime/7.32.2',
        accept: '*/*',
        'postman-token': '95b9a5ad-4c6d-478f-a955-825cd338bc86',
        host: 'localhost:3000',
        'accept-encoding': 'gzip, deflate, br',
        connection: 'keep-alive',
      };
      const result = await userController.getUser(header, 'kimsijun');
      expect(result.user.id).toEqual('kimsijun');
    });
  });
});
