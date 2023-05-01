import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { PhotoService } from './photo.service';
import { CreateRequestPhotoDto } from 'src/photo/dto/create-photo.dto';
import { Photo } from './entities/photo.entity';

@Controller('photo')
export class PhotoController {
  constructor(private readonly photoService: PhotoService) {}

  @Post('/createDefault')
  async createDefaultPhoto() {
    return await this.photoService.createDefaultPhoto();
  }

  @Post('/create')
  async createPhoto(@Body() createRequestPhotoDto: CreateRequestPhotoDto) {
    return await this.photoService.createPhoto(CreateRequestPhotoDto);
  }

  @Get('/:id')
  async getPhoto(@Param('id') id: number) {
    return await this.photoService.getPhoto(id);
  }

  @Get('/')
  async getAllPhoto() {
    return await this.photoService.getAllPhoto();
  }
}
