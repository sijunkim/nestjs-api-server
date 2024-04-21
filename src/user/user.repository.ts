import * as uuid from 'uuid';
import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CustomRepository } from '@root/config/typeorm/typeorm-ex.decorator';

@CustomRepository(User)
export class UserRepository extends Repository<User> {
  async findByName(name: string) {
    const users = await this.find({ where: { name } });

    return users;
  }
}
