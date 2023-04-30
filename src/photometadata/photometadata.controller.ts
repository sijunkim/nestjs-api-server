import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PhotometadataService } from './photometadata.service';
import { CreatePhotometadatumDto } from './dto/create-photometadatum.dto';
import { UpdatePhotometadatumDto } from './dto/update-photometadatum.dto';

@Controller('photometadata')
export class PhotometadataController {
  constructor(private readonly photometadataService: PhotometadataService) {}

  @Post()
  create(@Body() createPhotometadatumDto: CreatePhotometadatumDto) {
    return this.photometadataService.create(createPhotometadatumDto);
  }

  @Get()
  findAll() {
    return this.photometadataService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.photometadataService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePhotometadatumDto: UpdatePhotometadatumDto) {
    return this.photometadataService.update(+id, updatePhotometadatumDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.photometadataService.remove(+id);
  }
}
