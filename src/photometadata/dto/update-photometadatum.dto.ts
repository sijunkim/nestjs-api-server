import { PartialType } from '@nestjs/swagger';
import { CreatePhotometadatumDto } from './create-photometadatum.dto';

export class UpdatePhotometadatumDto extends PartialType(CreatePhotometadatumDto) {}
