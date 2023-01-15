


import { Injectable } from '@nestjs/common';
import { map } from 'rxjs/operators';
import { HttpService } from '@nestjs/axios';
import { Observable } from 'rxjs';
import { AxiosResponse } from 'axios';

import * as crypto from 'crypto';
import { monitorEventLoopDelay } from 'perf_hooks';


@Injectable()
export class AppService {

  constructor(private http: HttpService) {}

  getHello(): string {
    return 'Hello World!';
  }

  async getPic(name, size=200): Promise<ImageBitmap|string> {
    return this.http.axiosRef.get("http://" + this.avatarUrl(name) + `?size=${size}`, {
      headers: {
        'Content-Type': 'image/png',
      },
      responseType: 'arraybuffer'
    }).then(response => {
      return "data:image/png;base64," + Buffer.from(response.data).toString('base64')
    })
  }

  hashedName(name) {
    return crypto.createHash('md5').update(name).digest('hex');
  }

  private avatarUrl(name): string {
    return `${process.env.IMAGE_GEN_HOST}/${this.hashedName(name)}`;
  }

}
