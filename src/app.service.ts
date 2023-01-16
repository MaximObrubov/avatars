


import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { map } from 'rxjs/operators';
import { HttpService } from '@nestjs/axios';
import { Observable } from 'rxjs';

import Cache from 'cache-manager';

import * as crypto from 'crypto';
import { monitorEventLoopDelay } from 'perf_hooks';


@Injectable()
export class AppService {

  constructor(
    private http: HttpService,
    @Inject(CACHE_MANAGER) private cacheService: Cache,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  async getPic(name, size=200): Promise<ImageBitmap|string> {
    const type = 'image/png';
    const hashedName = this.hashedName(name);

    // TODO: caching not working
    // @ts-ignore
    const cachedData = await this.cacheService.get(hashedName);

    if (cachedData) {
      console.log(`Getting data from cache!`);
      return `${cachedData}`;
    }

    const response = await this.http.axiosRef.get("http://" + this.avatarUrl(name) + `?size=${size}`, {
      headers: { 'Content-Type': type },
      responseType: 'arraybuffer' // NOTE: it's important for receiving files
    });
    const image64 = `data:${type};base64,` + Buffer.from(response.data).toString('base64')

    // @ts-ignore
    await this.cacheService.set(hashedName, image64);
    return image64;
  }

  hashedName(name) {
    return crypto.createHash('md5').update(name).digest('hex');
  }

  private avatarUrl(name): string {
    return `${process.env.IMAGE_GEN_HOST}/${this.hashedName(name)}`;
  }

}
