import {
  Controller,
  Get,
  Render,
  Param,
  Res,
  Post,
  CACHE_MANAGER,
  Inject
} from '@nestjs/common';
//import the cache manager
import Cache from 'cache-manager';
import { AppService } from './app.service';

import * as crypto from 'crypto';

@Controller()
export class AppController {

  defaultName = 'John Doe'

  name: string;

  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private readonly appService: AppService,
  ) {
    this.name = this.defaultName;
  }

  @Get()
  @Render('index')
  getHello() {
    return {
      message: 'Avatars Service!',
      name: this.name,
      image_test: `${this.appService.PIC_SERVICE_URL}/${this.hashedName}`,
      // TODO: image alias from docker not working
      // image: `${this.appService.PIC_SERVICE_URL}/${this.hashedName}`,
      image_path: `monster/${this.hashedName}?size=100`
    }
  }

  @Post('/change-name')
  changeName(@Param() name, @Res() res) {
    this.name = res.req.body.name;
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
