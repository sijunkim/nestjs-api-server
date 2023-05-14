import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { EmailService } from 'src/email/email.service';
import { AuthService } from 'src/auth/auth.service';
import { Photo } from 'src/photo/entities/photo.entity';
import { PhotoMetadata } from 'src/photometadata/entities/photometadata.entity';
import { PhotoService } from 'src/photo/photo.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Photo, PhotoMetadata])],
  controllers: [UserController],
  providers: [UserService, EmailService, AuthService, PhotoService],
})
export class UserModule {}
