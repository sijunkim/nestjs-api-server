import { Injectable } from '@nestjs/common';
import { CreateRequestDummyDto } from './dto/create-dummy.dto';
import { Dummy } from './entities/dummy.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateRequestDummyDto } from './dto/update-dummy.dto';

@Injectable()
export class DummyService {
  constructor(
    @InjectRepository(Dummy)
    private dummyRepository: Repository<Dummy>,
  ) {}
  async createDummy(createRequestDummyDto: CreateRequestDummyDto) {
    return await this.dummyRepository.insert(createRequestDummyDto);
  }

  async createDefaultDummy() {
    let dummy = new Dummy();
    dummy.name = 'Me and Bears';
    dummy.description = 'So many types...';

    await this.dummyRepository.save(dummy);
  }

  async readDummy(id: number) {
    return await this.dummyRepository.findOneBy({ id });
  }

  async readAllDummy() {
    return await this.dummyRepository.find();
  }

  async updateDummy(updateRequestDummyDto: UpdateRequestDummyDto) {
    return await this.dummyRepository.update(
      {
        id: updateRequestDummyDto.id,
      },
      {
        name: updateRequestDummyDto.name,
        description: updateRequestDummyDto.description,
        updatedAt: new Date(),
      },
    );
  }

  async deleteDummy(id: number) {
    return await this.dummyRepository.delete({ id });
  }
}
