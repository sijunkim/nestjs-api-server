import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { User } from './entities/user.entity';
import { UserService } from './user.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { DeleteResult } from 'typeorm';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getUsers(): Promise<User[]> {
    return await this.userService.findAll();
  }

  @Get('/:userId')
  async getUser(@Param('userId') userId: string): Promise<User> {
    return await this.userService.findOne(userId);
  }

  @Post('/create')
  async setUser(@Body() createUserDTO: CreateUserDTO): Promise<User> {
    return await this.userService.create(createUserDTO);
  }

  @Put('/update')
  async putUser(@Body() updateUserDTO: UpdateUserDTO): Promise<User> {
    return await this.userService.update(updateUserDTO);
  }

  @Delete('/delete/:userId')
  async deleteUser(@Param('userId') id: string): Promise<DeleteResult> {
    return await this.userService.deleteUser(id);
  }
}
