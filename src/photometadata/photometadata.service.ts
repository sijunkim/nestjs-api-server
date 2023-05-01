import { Injectable } from '@nestjs/common';
import { CreatePhotometadataDto } from './dto/create-photometadata.dto';
import { UpdatePhotometadataDto } from './dto/update-photometadata.dto';
import { PhotoMetadataRepository } from './entities/photometadata.repository';

@Injectable()
export class PhotoMetadataService {
  constructor(private photoMetadataRepository: PhotoMetadataRepository) {}

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
