import { EntityRepository, Repository } from 'typeorm';
import { PhotoMetadata } from './photometadata.entity';

@EntityRepository(PhotoMetadata)
export class PhotoMetadataRepository extends Repository<PhotoMetadata> {}
