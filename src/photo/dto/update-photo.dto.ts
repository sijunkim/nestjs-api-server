import { PartialType } from '@nestjs/swagger';
import { CreateRequestPhotoDto } from './create-photo.dto';

export class UpdateRequestPhotoDto extends PartialType(CreateRequestPhotoDto) {}
