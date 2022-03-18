import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateSubAdDto } from './dto/create-subAd.dto';
import { UpdateSubAdDto } from './dto/update-subAd.dto';
import { SubAd } from './entities/subAd.entity';
import { SubAdRepository } from './repository/subAd.repository';

@Injectable()
export class SubAdService {
  constructor(
    @InjectRepository(SubAd)
    private subAdRepository: SubAdRepository,
  ) {}
  create(createSubAdDto: CreateSubAdDto) {
    return 'This action adds a new sub';
  }

  async findAll(): Promise<SubAd[]> {
    return await this.subAdRepository.find();
  }

  async findOne(id: number): Promise<SubAd> {
    return await this.subAdRepository.findOne(id);
  }

  async update(id: number, updateSubAdDto: UpdateSubAdDto): Promise<SubAd> {
    return await this.subAdRepository.findOne();
  }

  remove(id: number) {
    return `This action removes a #${id} sub`;
  }
}
