import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { DummyService } from './dummy.service';
import { CreateRequestDummyDto } from '@dummy/dto/create-dummy.dto';
import { UpdateRequestDummyDto } from './dto/update-dummy.dto';

@Controller('dummy')
export class DummyController {
  constructor(private readonly dummyService: DummyService) {}

  @Post('/create')
  async createDummy(@Body() createRequestPhotoDto: CreateRequestDummyDto) {
    return await this.dummyService.createDummy(createRequestPhotoDto);
  }

  @Post('/createDefault')
  async createDefaultDummy() {
    return await this.dummyService.createDefaultDummy();
  }

  @Get('/:id')
  async readDummy(@Param('id') id: number) {
    return await this.dummyService.readDummy(id);
  }

  @Get('/')
  async readAllDummy() {
    return await this.dummyService.readAllDummy();
  }

  @Put('/update')
  async updateDummy(@Body() updateRequestPhotoDto: UpdateRequestDummyDto) {
    return await this.dummyService.updateDummy(updateRequestPhotoDto);
  }

  @Delete('/delete/:id')
  async deleteDummy(@Param('id') id: number) {
    return await this.dummyService.deleteDummy(id);
  }
}
