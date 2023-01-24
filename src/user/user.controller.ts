import { Body, Controller, Delete, Get, Headers, Param, Post, Put, Query } from '@nestjs/common';
import { User } from './entities/user.entity';
import { UserService } from './user.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { UserLoginDTO } from './dto/user-login.dto';
import { DeleteResult } from 'typeorm';
import { UpdateUserDTO } from './dto/update-user.dto';
import { AuthService } from 'src/auth/auth.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService, private readonly authService: AuthService) {}

  @Get('/')
  async getUsers() {
    return await this.userService.findAll();
  }

  @Get('/:id')
  async getUser(@Headers() headers: any, @Param('id') id: string) {
    const jwtString = headers.authorization.split('Bearer ')[1];

    return this.authService.verify(jwtString);
  }

  @Post('/create')
  async createUser(@Body() createUserDTO: CreateUserDTO) {
    return await this.userService.createUser(createUserDTO);
  }

  @Put('/update')
  async putUser(@Body() updateUserDTO: UpdateUserDTO) {
    return await this.userService.putUser(updateUserDTO);
  }

  @Delete('/delete/:id')
  async deleteUser(@Param('id') id: string) {
    return await this.userService.deleteUser(id);
  }

  @Post('/email-verify')
  async verifyEmail(@Body() signupVerifyToken: string) {
    return await this.userService.verifyEmail(signupVerifyToken);
  }

  @Post('/login')
  async login(@Body() userLoginDTO: UserLoginDTO) {
    const { id, password } = userLoginDTO;
    return await this.userService.login(id, password);
  }
}
