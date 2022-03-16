import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from './app.guard';

@UseGuards(AuthGuard)
@Controller('')
export class AppController {
  @Get()
  home() {
    return process.env.PORT;
  }
}
