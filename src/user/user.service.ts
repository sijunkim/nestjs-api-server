import * as uuid from 'uuid';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, DeleteResult } from 'typeorm';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UserRepository } from './entities/user.repository';
import { EmailService } from 'src/email/email.service';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: UserRepository,
    private emailService: EmailService,
    private authService: AuthService,
    private connection: Connection,
  ) {}

  async getUser(id: string) {
    const user = await this.userRepository.findOne({ id: id });

    if (!user) {
      throw new NotFoundException('유저가 존재하지 않습니다');
    }

    return user;
  }

  async findAll() {
    return await this.userRepository.find();
  }

  async createUser(createUserDTO: CreateUserDTO) {
    const isExists = await this.checkUserExists(createUserDTO);
    if (!isExists) {
      const signupVerifyToken = uuid.v1();

      await this.saveUser(createUserDTO, signupVerifyToken);

      await this.sendMemberJoinEmail(createUserDTO.email, signupVerifyToken);
    }
  }

  async sendMemberJoinEmail(email: string, signupVerifyToken: string) {
    await this.emailService.sendMemberJoinVerification(
      email,
      signupVerifyToken,
    );
  }

  async saveUser(createUserDTO: CreateUserDTO, signupVerifyToken: string) {
    const user = new User();
    user.email = createUserDTO.email;
    user.id = createUserDTO.id;
    user.name = createUserDTO.name;
    user.password = createUserDTO.password;
    user.signupVerifyToken = signupVerifyToken;

    return await this.saveUserUsingQueryRunner(user);
  }

  async saveUserUsingQueryRunner(user: User) {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      await queryRunner.manager.save(user);

      // throw new InternalServerErrorException(); // 일부러 에러를 발생시켜 본다

      await queryRunner.commitTransaction();
    } catch (e) {
      // 에러가 발생하면 롤백
      await queryRunner.rollbackTransaction();
      console.log(e);
    } finally {
      // 직접 생성한 QueryRunner는 해제시켜 주어야 함
      await queryRunner.release();
    }
  }

  async putUser(updateUserDTO: UpdateUserDTO) {
    const user = await this.userRepository.findOne({ id: updateUserDTO.id });

    if (!user) {
      throw new NotFoundException('유저가 존재하지 않습니다');
    }
    else
    {
      user.name = updateUserDTO.name;
      user.email = updateUserDTO.email;
      user.address = updateUserDTO.address;
      user.age = updateUserDTO.age;
    }

    return await this.userRepository.save(user);
  }

  async deleteUser(id: string) {
    return await this.userRepository.delete({ id: id });
  }

  async checkUserExists(createUserDTO: CreateUserDTO) {
    const user = await this.userRepository.findOne({
      email: createUserDTO.email,
    });
    return user !== undefined;
  }

  async verifyEmail(signupVerifyToken: string) {
    const user = await this.userRepository.findOne({ signupVerifyToken: signupVerifyToken });

    if (!user) {
      throw new NotFoundException('유저가 존재하지 않습니다');
    }
    else
    {
      return this.authService.login({ id: user.id, name: user.name, email: user.email });
    }
  }

  async login(email: string, password: string) {
    const user = await this.userRepository.findOne({ email: email, password: password });

    if (!user) {
      throw new NotFoundException('일치하는 회원 정보가 없습니다.');
    }

    return this.authService.login({ id: user.id, name: user.name, email: user.email });
  }
}
