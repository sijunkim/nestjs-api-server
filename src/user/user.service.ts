import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult } from 'typeorm';
import { CreateUserDTO } from './dto/create.user.dto';
import { UpdateUserDTO } from './dto/update.user.dto';
import { User } from './entities/user.entity';
import { UserRepository } from './entities/user.repository';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: UserRepository,
  ) {}

  async findOne(userId: string): Promise<User> {
    return await this.userRepository.findOne({ userId: userId });
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async create(createUserDTO: CreateUserDTO): Promise<User> {
    const user = this.userRepository.create(createUserDTO);
    return await this.userRepository.save(user);
  }

  async update(updateUserDTO: UpdateUserDTO): Promise<User> {
    const user = await this.userRepository.findOne(updateUserDTO.userId);
    user.age = updateUserDTO.age;
    user.isActive = updateUserDTO.isActive;
    user.userName = updateUserDTO.userName;
    user.userPassword = updateUserDTO.userPassword;

    return await this.userRepository.save(user);
  }

  async deleteUser(userId: string): Promise<DeleteResult> {
    return await this.userRepository.delete({ userId: userId });
  }
}
