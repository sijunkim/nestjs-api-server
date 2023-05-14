import { IsEmail, IsOptional, IsString, Matches, MaxLength } from 'class-validator';

export class EmailVerifyRequestDto {
  @IsString()
  @MaxLength(60)
  readonly signupVerifyToken: string;
}
