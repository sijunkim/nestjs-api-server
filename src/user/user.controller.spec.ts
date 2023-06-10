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
import { UserLoginRequestDto } from './dto/user-login.dto';

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
    test('get bearer and login', async () => {
      const dto: UserLoginRequestDto = {
        id: 'kimsijun',
        password: 'temptemp',
      };
      const bearer = await userController.login(dto);
      const header = {
        authorization: `Bearer ${bearer}`,
        accept: '*/*',
        host: 'localhost:3000',
        connection: 'keep-alive',
      };
      const result = await userController.getUser(header, 'kimsijun');
      expect(result.user.id).toEqual('kimsijun');
    });
  });
});
