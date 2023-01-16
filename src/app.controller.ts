import {
  Controller,
  Get,
  Render,
  Param,
  Response,
  Res,
  Post,
} from '@nestjs/common';

import { AppService } from './app.service';


@Controller()
export class AppController {

  defaultName = 'John Doe'

  CACHE_PREFIX = "avatars_"

  name: string;


  constructor(
    // @Inject(CACHE_MANAGER) private cacheManager: Cache,
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
    // NOTE: `name` param is not valid, becase it is a form input
    this.name = res.req.body.name;
    return res.redirect('/');
  }

}
