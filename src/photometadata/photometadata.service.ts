import { Injectable } from '@nestjs/common';
import { CreatePhotometadataDto } from './dto/create-photometadata.dto';
import { UpdatePhotometadataDto } from './dto/update-photometadata.dto';

@Injectable()
export class PhotometadataService {
  create(createPhotometadatumDto: CreatePhotometadataDto) {
    return 'This action adds a new photometadatum';
  }

  findAll() {
    return `This action returns all photometadata`;
  }

  findOne(id: number) {
    return `This action returns a #${id} photometadatum`;
  }

  update(id: number, updatePhotometadatumDto: UpdatePhotometadataDto) {
    return `This action updates a #${id} photometadatum`;
  }

  remove(id: number) {
    return `This action removes a #${id} photometadatum`;
  }
}
