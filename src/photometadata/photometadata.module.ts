import { Module } from '@nestjs/common';
import { PhotoMetadataService } from './photometadata.service';
import { PhotometadataController } from './photometadata.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PhotoMetadata } from './entities/photometadata.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PhotoMetadata])],
  controllers: [PhotometadataController],
  providers: [PhotoMetadataService],
})
export class PhotometadataModule {}
