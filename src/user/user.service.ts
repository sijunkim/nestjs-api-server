import * as uuid from 'uuid';
import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { CreateUserRequestDto } from './dto/create-user.dto';
import { UpdateUserRequestDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { EmailService } from 'src/email/email.service';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private emailService: EmailService,
    private authService: AuthService,
    private dataSource: DataSource,
  ) {}

  async getUser(id: string) {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) {
      throw new NotFoundException('유저가 존재하지 않습니다');
    }

    return user;
  }

  async findAll() {
    return await this.userRepository.find();
  }

  async createUser(dto: CreateUserRequestDto) {
    const isExists = await this.checkUserExists(dto);
    if (isExists === false) {
      const signupVerifyToken = uuid.v1();
      const result = await this.emailService.sendMemberJoinVerification(
        dto.email,
        signupVerifyToken,
      );
      if (result != null && result.accepted !== undefined && result.accepted.includes(dto.email)) {
        const user: User = new User();
        user.id = dto.id;
        user.name = dto.name;
        user.email = dto.email;
        user.password = dto.password;
        user.signupVerifyToken = signupVerifyToken;

        await this.saveUser(user);
      }
    }
  }

  async saveUser(user: User) {
    // await this.saveUserUsingQueryRunner(user);
    await this.saveUserUsingTransaction(user);
  }

  async saveUserUsingQueryRunner(user: User) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      await queryRunner.manager.save(user);

      throw new InternalServerErrorException(); // 일부러 에러를 발생시켜 본다

      // await queryRunner.commitTransaction();
    } catch (e) {
      // 에러가 발생하면 롤백
      await queryRunner.rollbackTransaction();
      console.log(e);
    } finally {
      // 직접 생성한 QueryRunner는 해제시켜 주어야 함
      await queryRunner.release();
    }
  }

  async saveUserUsingTransaction(user: User) {
    await this.dataSource.transaction(async (manager) => {
      await manager.save(user);

      // throw new InternalServerErrorException(); // 일부러 에러를 발생시켜 본다
    });
  }

  async putUser(dto: UpdateUserRequestDto) {
    const user = await this.userRepository.findOneBy({ id: dto.id });

    if (!user) {
      throw new NotFoundException('유저가 존재하지 않습니다');
    } else {
      user.name = dto.name;
      user.email = dto.email;
      user.address = dto.address;
      user.age = dto.age;
    }

    return await this.userRepository.save(user);
  }

  async deleteUser(id: string) {
    return await this.userRepository.delete({ id: id });
  }

  async checkUserExists(dto: CreateUserRequestDto) {
    const user = await this.userRepository.findOneBy({ email: dto.email });
    return user !== null;
  }

  async verifyEmail(signupVerifyToken: string) {
    const user = await this.userRepository.findOneBy({ signupVerifyToken });

    if (!user) {
      throw new NotFoundException('유저가 존재하지 않습니다');
    } else {
      return this.authService.login({
        id: user.id,
        name: user.name,
        email: user.email,
      });
    }
  }

  async login(id: string, password: string) {
    const user = await this.userRepository.findOneBy({ id, password });

    if (!user) {
      throw new NotFoundException('일치하는 회원 정보가 없습니다.');
    }

    return this.authService.login({
      id: user.id,
      name: user.name,
      email: user.email,
    });
  }
}
