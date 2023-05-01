import { Module } from '@nestjs/common';
import { PhotoService } from './photo.service';
import { PhotoController } from './photo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PhotoRepository } from './entities/photo.repository';
import { PhotoMetadataRepository } from 'src/photometadata/entities/photometadata.repository';

@Module({
  imports: [TypeOrmModule.forFeature([PhotoRepository, PhotoMetadataRepository])],
  controllers: [PhotoController],
  providers: [PhotoService],
})
export class PhotoModule {}
