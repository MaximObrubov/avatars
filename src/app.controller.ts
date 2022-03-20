import {
  Controller,
  Get,
  Render,
  Param,
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AppService } from './app.service';
import { map } from 'rxjs/operators';

import * as crypto from 'crypto';
// var crypto = require('crypto');

@Controller()
export class AppController {

  defaultName = 'John Doe'

  name: string;

  constructor(private readonly appService: AppService, private http: HttpService) {
    this.name = this.defaultName;
  }

  @Get()
  @Render('index')
  getHello() {
    return {
      message: 'Hello111 world!',
      name: this.hashedName,
    }
  }

  @Get('/avatar/:name')
  async getImage(@Param() name) {
    return await this.genImage(name);
  }

  private async genImage(name) {
    const response = this.http.get(`${process.env.IMAGE_GEN_HOST}/${name}`);

    response.pipe(
      map(response => {
        console.log('===================================================')
        console.log(response)
        console.log('===================================================')

      })
    )


    return response;
  }

  private get hashedName() {
    return crypto.createHash('md5').update(this.name).digest('hex');
  }
}
