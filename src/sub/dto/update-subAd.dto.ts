import { PartialType } from '@nestjs/swagger';
import { CreateSubAdDto } from './create-subAd.dto';

export class UpdateSubAdDto extends PartialType(CreateSubAdDto) {}
