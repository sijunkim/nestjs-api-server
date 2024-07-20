import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { EmailService } from '@email/email.service';
import { AuthService } from '@auth/auth.service';
import { Photo } from '@photo/entities/photo.entity';
import { PhotoMetadata } from '@photometadata/entities/photometadata.entity';
import { PhotoService } from '@photo/photo.service';
import { TypeOrmExModule } from '@config/typeorm/typeorm-ex.module';
import { UserRepository } from './user.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Photo, PhotoMetadata]),
    TypeOrmExModule.forCustomRepository([UserRepository]),
  ],
  controllers: [UserController],
  providers: [UserService, EmailService, AuthService, PhotoService, UserRepository],
})
export class UserModule {}
