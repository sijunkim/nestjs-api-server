import { Module } from '@nestjs/common';
import { SubAdService } from './subAd.service';
import { SubAdController } from './subAd.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubAd } from './entities/subAd.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SubAd])],
  controllers: [SubAdController],
  providers: [SubAdService],
})
export class SubModule {}
