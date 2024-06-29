import { PartialType } from '@nestjs/swagger';
import { CreatePhotometadataDto } from './create-photometadata.dto';

export class UpdatePhotometadataDto extends PartialType(CreatePhotometadataDto) {}
