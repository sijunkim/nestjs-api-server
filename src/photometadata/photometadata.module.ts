import { Module } from '@nestjs/common';
import { PhotoMetadataService } from './photometadata.service';
import { PhotometadataController } from './photometadata.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PhotoMetadataRepository } from './entities/photometadata.repository';

@Module({
  imports: [TypeOrmModule.forFeature([PhotoMetadataRepository])],
  controllers: [PhotometadataController],
  providers: [PhotoMetadataService],
})
export class PhotometadataModule {}
