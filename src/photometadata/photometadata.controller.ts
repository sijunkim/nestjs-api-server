import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PhotometadataService } from './photometadata.service';
import { CreatePhotometadataDto } from './dto/create-photometadata.dto';
import { UpdatePhotometadataDto } from './dto/update-photometadata.dto';

@Controller('photometadata')
export class PhotometadataController {
  constructor(private readonly photometadataService: PhotometadataService) {}

  @Post()
  create(@Body() createPhotometadataDto: CreatePhotometadataDto) {
    return this.photometadataService.create(createPhotometadataDto);
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
  update(@Param('id') id: string, @Body() updatePhotometadataDto: UpdatePhotometadataDto) {
    return this.photometadataService.update(+id, updatePhotometadataDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.photometadataService.remove(+id);
  }
}
