import { Module } from '@nestjs/common';
import { PhotometadataService } from './photometadata.service';
import { PhotometadataController } from './photometadata.controller';

@Module({
  controllers: [PhotometadataController],
  providers: [PhotometadataService]
})
export class PhotometadataModule {}
