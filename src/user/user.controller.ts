import { Body, Controller, Delete, Get, Headers, HttpCode, HttpStatus, Param, Post, Put, Query } from '@nestjs/common';
import { UserService } from './user.service';

// import { DeleteResult } from 'typeorm';
import { AuthService } from '@auth/auth.service';
import { HttpResponseDto } from 'src/common/dto/http-response.dto';
import { CreateUserRequestDto, CreateUserResponseDto } from './dto/create-user.dto';
import { UpdateUserRequestDto } from './dto/update-user.dto';
import { EmailVerifyRequestDto } from './dto/email-verify.dto';
import { UserLoginRequestDto } from './dto/user-login.dto';
import { ReadUserResponseDto } from './dto/read-user.dto';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Get('/')
  async getUsers() {
    return await this.userService.findAll();
  }

  @Get('/:id')
  async getUser(@Headers() headers: any, @Param('id') id: string): Promise<ReadUserResponseDto> {
    const jwtString = headers.authorization.split('Bearer ')[1];
    const verified = this.authService.verify(jwtString);
    if (verified.id === id) {
      const dto = await this.userService.getUser(id);
      return dto;
    }
  }

  @Get('/name/:name')
  async getUsersByName(@Headers() headers: any, @Param('name') name: string): Promise<ReadUserResponseDto> {
    const jwtString = headers.authorization.split('Bearer ')[1];
    const verified = this.authService.verify(jwtString);
    if (verified.name === name) {
      const dto = await this.userService.getUsersByName(name);
      return dto;
    }
  }

  findByName;

  @Post('/create')
  async createUser(@Body() dto: CreateUserRequestDto): Promise<CreateUserResponseDto | HttpResponseDto> {
    let result: CreateUserResponseDto = {};
    try {
      const data = await this.userService.createUser(dto);
      result.user = data;
      result.status = HttpStatus.OK;
    } catch (error) {
      result.messages = error.messages;
      result.requestDto = dto;
      result.status = HttpStatus.BAD_REQUEST;
    }

    return result;
  }

  @Put('/update')
  async putUser(@Body() dto: UpdateUserRequestDto) {
    return await this.userService.putUser(dto);
  }

  @Delete('/delete/:id')
  async deleteUser(@Param('id') id: string) {
    return await this.userService.deleteUser(id);
  }

  @Post('/email-verify')
  async verifyEmail(@Body() emailVerifyDTO: EmailVerifyRequestDto) {
    const { signupVerifyToken } = emailVerifyDTO;
    return await this.userService.verifyEmail(signupVerifyToken);
  }

  @Post('/login')
  async login(@Body() dto: UserLoginRequestDto) {
    const { id, password } = dto;
    return await this.userService.login(id, password);
  }
}
