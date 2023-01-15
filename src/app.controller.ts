import {
  Controller,
  Get,
  Render,
  Param,
  Response,
  Res,
  Post,
  CACHE_MANAGER,
  Inject,
} from '@nestjs/common';

//import the cache manager
import Cache from 'cache-manager';
import { AppService } from './app.service';

import { createReadStream } from 'fs';
import { Observable } from 'rxjs';

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
  async getHello() {
    return {
      message: 'Avatars Service!',
      name: this.name,
      // image_url: `${process.env.IMAGE_GEN_HOST}/${this.appService.hashedName(this.name)}`,
      // TODO: image alias from docker not working
      image: await this.appService.getPic(this.name),
    }
  }

  @Post('/change-name')
  changeName(@Param('name') name, @Res() res) {
    // NOTE: name param is not valid, becase t"name is fomr input 
    this.name = res.req.body.name;
    return res.redirect('/');
  }

}
