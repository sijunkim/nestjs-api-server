import { IsEmail, IsOptional, IsString, Matches, MaxLength } from 'class-validator';

export class EmailVerifyDTO {
  @IsString()
  @MaxLength(60)
  readonly signupVerifyToken: string;
}
