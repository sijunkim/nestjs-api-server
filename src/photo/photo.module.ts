import { Module } from '@nestjs/common';
import { PhotoService } from './photo.service';
import { PhotoController } from './photo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Photo } from './entities/photo.entity';
import { PhotoMetadata } from 'src/photometadata/entities/photometadata.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Photo, PhotoMetadata])],
  controllers: [PhotoController],
  providers: [PhotoService],
})
export class PhotoModule {}
