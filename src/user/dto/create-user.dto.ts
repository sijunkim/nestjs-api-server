import { BadRequestException } from '@nestjs/common';
import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { HttpResponseDto } from '@common/dto/http-response.dto';
import { User } from '../entities/user.entity';

export class CreateUserRequestDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @Transform(({ value, obj }) => {
    if (obj.password.includes(value.trim())) {
      throw new BadRequestException('password는 name과 같은 문자열을 포함할 수 없습니다.');
    }
    return value.trim();
  })
  @IsString()
  @MinLength(2)
  @MaxLength(30)
  readonly name: string;

  @IsString()
  @IsEmail()
  @MaxLength(60)
  readonly email: string;

  @IsString()
  @Matches(/^[A-Za-z\d!@#$%^&*()]{8,30}$/)
  readonly password: string;

  @IsString()
  @MaxLength(20)
  address: string;

  @IsNumber()
  age: number;
}

export class CreateUserResponseDto extends HttpResponseDto {
  requestDto?: CreateUserRequestDto;
  user?: User;
}
