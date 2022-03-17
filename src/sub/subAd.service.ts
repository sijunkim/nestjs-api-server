import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult } from 'typeorm';
import { CreateSubAdDto } from './dto/create-subAd.dto';
import { UpdateSubAdDto } from './dto/update-subAd.dto';
import { SubAd } from './entities/subAd.entity';
import { SubAdRepository } from './repository/subAd.repository';

@Injectable()
export class SubAdService {
  constructor(
    @InjectRepository(SubAd)
    private readonly subAdRepository: SubAdRepository,
  ) {}
  async create(createSubAdDto: CreateSubAdDto) {
    const createSubAd = await this.subAdRepository.create(createSubAdDto);
    return await this.subAdRepository.save(createSubAd);
  }
  async findAll(): Promise<SubAd[]> {
    return await this.subAdRepository.find();
  }

  async findOne(subAd_no: number): Promise<SubAd> {
    return await this.subAdRepository.findOne(subAd_no);
  }

  async update(
    subAd_no: number,
    updateSubAdDto: UpdateSubAdDto,
  ): Promise<SubAd> {
    const updateSubAd = await this.subAdRepository.findOne(subAd_no);
    updateSubAd.subAd_title = updateSubAdDto.subAd_title;
    updateSubAd.subAd_prod = updateSubAdDto.subAd_prod;
    updateSubAd.subAd_info = updateSubAdDto.subAd_info;
    updateSubAd.subAd_price = updateSubAdDto.subAd_price;
    updateSubAd.subAd_quntity = updateSubAdDto.subAd_quntity;
    return await this.subAdRepository.save(updateSubAd);
  }

  async remove(subAd_no: number): Promise<DeleteResult> {
    return await this.subAdRepository.delete(subAd_no);
  }
}
