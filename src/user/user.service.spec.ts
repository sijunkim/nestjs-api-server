import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';
import { User } from './entities/user.entity';

describe('UserService', () => {
  let userController: UserController;
  let userService: UserService;
  let userRepository: UserRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService, UserRepository],
    }).compile();

    userController = module.get(UserController);
    userService = module.get(UserService);
    userRepository = module.get(UserRepository);
  });

  it('should be defined', () => {
    const calculator = {
      add: (a, b) => a + b,
    };

    const spyFn = jest.spyOn(calculator, 'add');

    const result = calculator.add(2, 3);

    expect(spyFn).toHaveBeenCalledTimes(1);
    expect(spyFn).toHaveBeenCalledWith(2, 3);
    expect(result).toBe(5);
  });

  it('user will be created.', async () => {
    it('게시글 목록을 반환한다.', async () => {
      const userName = '김시준';
      const existsUsers = [
        User.of({
          id: 'kimsijun',
          name: '김시준',
          email: 'papaya9349@naver.com',
          password: 'temptemp',
          signupVerifyToken: '0b7d9210-fa3a-11ee-8986-1d7a30063853',
          address: '',
          age: 0,
          createdAt: new Date(),
          photos: undefined,
        }),
      ];
      const existingCount = 1;
      const existingUsersAndCount = {
        users: existsUsers,
        count: existingCount,
      };

      const findByNameSpy = jest.spyOn(userRepository, 'findByName').mockResolvedValue(existsUsers);
      const result = await userService.getUsersByName(userName);

      expect(findByNameSpy).toHaveBeenCalledWith(userName);
      expect(result).toEqual(existingUsersAndCount);
    });
  });
});
