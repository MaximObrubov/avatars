import {
  Controller,
  Get,
  Render,
  Param,
  Res,
  Post,
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
    return {
      message: 'Hello111 world!',
      name: this.name,
      image_test: `${this.appService.PIC_SERVICE_URL}/${this.hashedName}`,
      // TODO: image alias from docker not working
      // image: `${this.appService.PIC_SERVICE_URL}/${this.hashedName}`,
      image_path: `monster/${this.hashedName}?size=100`
    }
  }

  @Post('/change-name')
  changeName(@Param() name, @Res() res) {

    console.log('===================================================')
    console.log(name)
    console.log(res)
    console.log('===================================================')


    this.name = name;
    return res.redirect('/');
  }


  @Get('/avatar/:name')
  async getImage(@Param() name, @Res() res) {
    return this.appService.getPic(name);
  }

  private get hashedName() {
    return crypto.createHash('md5').update(this.name).digest('hex');
  }
}
