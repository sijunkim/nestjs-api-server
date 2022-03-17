import {
  IsEmail,
  IsString,
  Matches,
  MaxLength,
} from 'class-validator';

export class UserLoginDTO {
  @IsString()
  @IsEmail()
  @MaxLength(60)
  readonly email: string;

  @IsString()
  @Matches(/^[A-Za-z\d!@#$%^&*()]{8,30}$/)
  readonly password: string;
}
