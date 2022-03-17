import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { CreateSubAdDto } from './dto/create-subAd.dto';
import { UpdateSubAdDto } from './dto/update-subAd.dto';
import { SubAd } from './entities/subAd.entity';
import { SubAdService } from './subAd.service';

@Controller('subAd')
export class SubAdController {
  constructor(private readonly subAdService: SubAdService) {}

  @Get()
  async getSubAd(): Promise<SubAd[]> {
    return await this.subAdService.findAll();
  }

  @Get('/:subAd_no')
  async getSubAdOne(@Param('subAd_no') subAd_no: number): Promise<SubAd> {
    return await this.subAdService.findOne(subAd_no);
  }

  @Post()
  async postSubAd(@Body() createSubAdDto: CreateSubAdDto): Promise<SubAd> {
    return await this.subAdService.create(createSubAdDto);
  }

  @Put('/update/:id')
  async putSubAd(
    @Param('subAd_no') subAd_no: number,
    updateSubAdDto: UpdateSubAdDto,
  ): Promise<SubAd> {
    return await this.subAdService.update(subAd_no, updateSubAdDto);
  }
}
