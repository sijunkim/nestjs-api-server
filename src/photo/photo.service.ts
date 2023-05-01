import { Injectable } from '@nestjs/common';
import { CreateRequestPhotoDto } from './dto/create-photo.dto';
import { Photo } from './entities/photo.entity';
import { PhotoRepository } from './entities/photo.repository';
import { PhotoMetadata } from 'src/photometadata/entities/photometadata.entity';
import { PhotoMetadataRepository } from 'src/photometadata/entities/photometadata.repository';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PhotoService {
  constructor(
    private photoRepository: PhotoRepository,
    private photoMetadataRepository: PhotoMetadataRepository,
  ) {}

  async createDefaultPhoto() {
    let photo = new Photo();
    photo.name = 'Me and Bears';
    photo.description = 'I am near polar bears';
    photo.filename = 'photo-with-bears.jpg';
    photo.views = 1;
    photo.isPublished = true;

    let photoMetadata = new PhotoMetadata();
    photoMetadata.height = 640;
    photoMetadata.width = 480;
    photoMetadata.compressed = true;
    photoMetadata.comment = 'cybershoot';
    photoMetadata.orientation = 'portrait';

    photo.photoMetadata = photoMetadata;
    photoMetadata.photo = photo;

    await this.photoRepository.save(photo);
    await this.photoMetadataRepository.save(photoMetadata);
  }

  async createPhoto(createRequestPhotoDto: CreateRequestPhotoDto) {}

  async getPhoto(id: number) {
    return this.photoRepository.find({ id: id });
  }
}
