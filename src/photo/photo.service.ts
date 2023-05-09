import { Injectable } from '@nestjs/common';
import { CreateRequestPhotoDto } from './dto/create-photo.dto';
import { Photo } from './entities/photo.entity';
import { PhotoMetadata } from 'src/photometadata/entities/photometadata.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PhotoService {
  constructor(
    @InjectRepository(Photo)
    private photoRepository: Repository<Photo>,
    @InjectRepository(PhotoMetadata)
    private photoMetadataRepository: Repository<PhotoMetadata>,
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

    await this.photoRepository.save(photo);
  }

  async createPhoto(createRequestPhotoDto: CreateRequestPhotoDto) {}

  async getPhoto(id: number) {
    return await this.photoRepository.findOneBy({ id });
  }

  async getAllPhoto() {
    return await this.photoRepository.find({
      relations: ['photoMetadata'],
    });
  }
}
