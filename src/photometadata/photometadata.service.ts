import { Injectable } from '@nestjs/common';
import { CreatePhotometadatumDto } from './dto/create-photometadatum.dto';
import { UpdatePhotometadatumDto } from './dto/update-photometadatum.dto';

@Injectable()
export class PhotometadataService {
  create(createPhotometadatumDto: CreatePhotometadatumDto) {
    return 'This action adds a new photometadatum';
  }

  findAll() {
    return `This action returns all photometadata`;
  }

  findOne(id: number) {
    return `This action returns a #${id} photometadatum`;
  }

  update(id: number, updatePhotometadatumDto: UpdatePhotometadatumDto) {
    return `This action updates a #${id} photometadatum`;
  }

  remove(id: number) {
    return `This action removes a #${id} photometadatum`;
  }
}
