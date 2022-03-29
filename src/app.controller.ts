import {
  Controller,
  Get,
  Render,
  Param,
  Res,
} from '@nestjs/common';
import { AppService } from './app.service';

import * as crypto from 'crypto';

@Controller()
export class AppController {

  defaultName = 'John Doe'

  name: string;

  constructor(private readonly appService: AppService) {
    this.name = this.defaultName;
  }



  @Get()
  @Render('index')
  getHello() {

    console.log('===================================================')
    console.log(this.appService.PIC_SERVICE_URL)
    console.log(process.env.IMAGE_GEN_HOST)
    console.log('===================================================')


    return {
      message: 'Hello111 world!',
      image_test: `${this.appService.PIC_SERVICE_URL}/${this.hashedName}`,
      image: `${this.appService.PIC_SERVICE_URL}/${this.hashedName}`,
      // image: this.appService.getPic(this.hashedName)
    }
  }

  @Get('/avatar/:name')
  async getImage(@Param() name, @Res() res) {
    return this.appService.getPic(name);
  }

  private get hashedName() {
    return crypto.createHash('md5').update(this.name).digest('hex');
  }
}
