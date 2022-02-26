import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDTO {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(16)
  userName: string;

  @IsString()
  @IsNotEmpty()
  userPassword: string;

  @IsNumber()
  @IsNotEmpty()
  age: number;

  @IsBoolean()
  @IsNotEmpty()
  isActive: boolean;
}
