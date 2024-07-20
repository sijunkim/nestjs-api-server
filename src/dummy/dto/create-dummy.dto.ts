import { IsString, MaxLength, MinLength } from 'class-validator';

export class CreateRequestDummyDto {
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  readonly name: string;

  @IsString()
  @MaxLength(100)
  readonly description: string;
}
