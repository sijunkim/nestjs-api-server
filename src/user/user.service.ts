import * as uuid from 'uuid';
import { HttpCode, HttpStatus, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { CreateUserRequestDto } from './dto/create-user.dto';
import { UpdateUserRequestDto } from './dto/update-user.dto';
import { User } from '@user/entities/user.entity';
import { EmailService } from '@email/email.service';
import { AuthService } from '@auth/auth.service';
import { Photo } from '@photo/entities/photo.entity';
import { PhotoMetadata } from '@photometadata/entities/photometadata.entity';
import { ReadUserResponseDto } from './dto/read-user.dto';
// import { HttpResponseDto } from '../common/dto/http-response.dto';
import { ErrorType } from '@common/enum/error-type.enum';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(
    private userRepository: UserRepository,
    @InjectRepository(Photo)
    private photoRepository: Repository<Photo>,
    private emailService: EmailService,
    private authService: AuthService,
    private dataSource: DataSource,
  ) {}

  async getUser(id: string): Promise<ReadUserResponseDto> {
    const dto: ReadUserResponseDto = {};
    const user = await this.userRepository.findOne({
      select: {
        id: true,
        photos: {
          name: true,
          description: true,
          photoMetadata: {
            id: true,
            orientation: true,
            compressed: true,
          },
        },
      },
      where: {
        id,
        // photos: {
        //   id: 10,
        //   photoMetadata: {
        //     id: 5,
        //   },
        // },
      },
      relations: {
        photos: {
          photoMetadata: true,
        },
      },
    });

    if (!user) {
      dto.code = ErrorType.USER_NOT_FOUND_ERROR;
      dto.messages = '유저가 존재하지 않습니다';
    } else {
      dto.user = user;
    }

    return dto;
  }

  async findAll() {
    return await this.userRepository.find({
      relations: {
        photos: {
          photoMetadata: true,
        },
      },
    });
  }

  async createUser(dto: CreateUserRequestDto) {
    const isExists = await this.checkUserExists(dto);
    if (isExists === false) {
      const signupVerifyToken = uuid.v1();
      const result = await this.emailService.sendMemberJoinVerification(dto.email, signupVerifyToken);
      if (result != null && result.accepted !== undefined && result.accepted.includes(dto.email)) {
        const photo = new Photo();
        photo.name = 'Me and Bears';
        photo.description = 'I am near polar bears';
        photo.filename = 'photo-with-bears.jpg';
        photo.views = 1;
        photo.isPublished = true;

        const photoMetadata = new PhotoMetadata();
        photoMetadata.height = 640;
        photoMetadata.width = 480;
        photoMetadata.compressed = true;
        photoMetadata.comment = 'cybershoot';
        photoMetadata.orientation = 'portrait';

        photo.photoMetadata = photoMetadata;

        const user = new User();
        user.id = dto.id;
        user.name = dto.name;
        user.email = dto.email;
        user.password = dto.password;
        user.signupVerifyToken = signupVerifyToken;
        user.photos = [photo];

        await this.saveUser(user);

        return user;
      }
    }
  }

  async saveUser(user: User) {
    // await this.saveUserUsingQueryRunner(user);
    return await this.saveUserUsingTransaction(user);
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
      return await manager.save(user);

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
    return await this.userRepository.delete({ id });
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

  async getUsersByName(name: string) {
    const dto: ReadUserResponseDto = {};
    const users = await this.userRepository.findByName(name);

    if (!users) {
      dto.code = ErrorType.USER_NOT_FOUND_ERROR;
      dto.messages = '유저가 존재하지 않습니다';
    } else {
      dto.users = users;
    }

    return dto;
  }
}
