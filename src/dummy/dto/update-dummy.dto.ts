import { PartialType } from '@nestjs/swagger';
import { CreateRequestDummyDto } from './create-dummy.dto';
import { IsNumber } from 'class-validator';

export class UpdateRequestDummyDto extends PartialType(CreateRequestDummyDto) {
  @IsNumber()
  readonly id: number;
}
