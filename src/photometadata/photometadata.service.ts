import { Injectable } from '@nestjs/common';
import { CreatePhotometadataDto } from './dto/create-photometadata.dto';
import { UpdatePhotometadataDto } from './dto/update-photometadata.dto';
import { Repository } from 'typeorm';
import { PhotoMetadata } from './entities/photometadata.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PhotoMetadataService {
  constructor(
    @InjectRepository(PhotoMetadata)
    private photoMetadataRepository: Repository<PhotoMetadata>,
  ) {}

  create(createPhotometadatumDto: CreatePhotometadataDto) {
    return 'This action adds a new photometadatum';
  }

  findAll() {
    return `This action returns all photometadata`;
  }

  async findOne(id: number) {
    return await this.photoMetadataRepository.findOne(id);
  }

  update(id: number, updatePhotometadatumDto: UpdatePhotometadataDto) {
    return `This action updates a #${id} photometadatum`;
  }

  remove(id: number) {
    return `This action removes a #${id} photometadatum`;
  }
}
