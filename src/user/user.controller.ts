import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { User } from './entities/user.entity';
import { UserService } from './user.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { UserLoginDTO } from './dto/user-login.dto';
import { DeleteResult } from 'typeorm';
import { UpdateUserDTO } from './dto/update-user.dto';
import { AuthService } from 'src/auth/auth.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Get()
  async getUsers(): Promise<User[]> {
    return await this.userService.findAll();
  }

  @Get('/:id')
  async getUser(
    @Headers() headers: any,
    @Param('id') id: string,
  ): Promise<User> {
    const jwtString = headers.authorization.split('Bearer ')[1];

    this.authService.verify(jwtString);

    return this.userService.getUser(id);
  }

  @Post('/create')
  async createUser(@Body() createUserDTO: CreateUserDTO) {
    this.userService.createUser(createUserDTO);
  }

  @Put('/update')
  async putUser(@Body() updateUserDTO: UpdateUserDTO): Promise<User> {
    return await this.userService.putUser(updateUserDTO);
  }

  @Delete('/delete/:id')
  async deleteUser(@Param('id') id: string): Promise<DeleteResult> {
    return await this.userService.deleteUser(id);
  }

  @Post('/email-verify')
  async verifyEmail(
    @Query('signupVerifyToken') signupVerifyToken: string,
    // @Query('temp') temp: string,
  ): Promise<string> {
    return await this.userService.verifyEmail(signupVerifyToken);
  }

  @Post('/login')
  async login(@Body() userLoginDTO: UserLoginDTO) {
    console.log(userLoginDTO);
    const { email, password } = userLoginDTO;
    return await this.userService.login(email, password);
  }
}
