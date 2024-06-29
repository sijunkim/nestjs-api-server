import { PartialType } from '@nestjs/mapped-types';
import { CreateUserRequestDto } from './create-user.dto';

export class UpdateUserRequestDto extends PartialType(CreateUserRequestDto) {}
