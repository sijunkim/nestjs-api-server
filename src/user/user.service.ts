import * as uuid from 'uuid';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, DeleteResult } from 'typeorm';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UserRepository } from './entities/user.repository';
import { EmailService } from 'src/email/email.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: UserRepository,
    private emailService: EmailService,
    private connection: Connection,
  ) {}

  async getUser(email: string): Promise<User> {
    return await this.userRepository.findOne({ email: email });
  }

  async findAll(): Promise<User[]> {
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

  async putUser(updateUserDTO: UpdateUserDTO): Promise<User> {
    const user = await this.userRepository.findOne({ id: updateUserDTO.id });
    // user.id = updateUserDTO.id;
    user.email = updateUserDTO.email;
    user.name = updateUserDTO.name;
    // user.password = updateUserDTO.password;
    // user.signupVerifyToken = updateUserDTO.signupVerifyToken;

    return await this.userRepository.save(user);
  }

  async deleteUser(id: string): Promise<DeleteResult> {
    return await this.userRepository.delete({ id: id });
  }

  async checkUserExists(createUserDTO: CreateUserDTO) {
    const user = await this.userRepository.findOne({ email: createUserDTO.email });
    return user !== undefined;
  }

  async verifyEmail(signupVerifyToken: string): Promise<string> {
    // TODO
    // 1. DB에서 signupVerifyToken으로 회원 가입 처리중인 유저가 있는지 조회하고 없다면 에러 처리
    // 2. 바로 로그인 상태가 되도록 JWT를 발급

    throw new Error('Method not implemented.');
  }

  async login(email: string, password: string): Promise<string> {
    // TODO
    // 1. email, password를 가진 유저가 존재하는지 DB에서 확인하고 없다면 에러 처리
    // 2. JWT를 발급

    throw new Error('Method not implemented.');
  }
}
