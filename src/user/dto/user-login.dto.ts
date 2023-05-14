import { IsEmail, IsOptional, IsString, Matches, MaxLength } from 'class-validator';

export class UserLoginRequestDto {
  @IsOptional()
  @IsString()
  @IsEmail()
  @MaxLength(60)
  readonly email: string;

  @IsString()
  readonly id: string;

  @IsString()
  @Matches(/^[A-Za-z\d!@#$%^&*()]{8,30}$/)
  readonly password: string;
}
