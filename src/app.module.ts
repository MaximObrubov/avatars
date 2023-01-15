//import CacheModule from '@neskjs/common/cache';
import type { ClientOpts } from 'redis';
// import * as redisStore from 'cache-manager-redis-store';
import { redisStore } from 'cache-manager-redis-store'
import { Module, CacheModule, CacheStore } from '@nestjs/common';

//import redisStore from 'cache-manager-redis-store';

import { HttpModule, } from '@nestjs/axios';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    // CacheModule.register<ClientOpts>({
    //   store: redisStore as unknown as CacheStore,
    //   // Store-specific configuration:
    //   host: process.env.REDIS_URL,
    //   port: 6379,
    // }),
    CacheModule.register({
      isGlobal: true,
      store: redisStore as undefined as CacheStore,
      host: 'localhost',
      port: 6379,
    }),
    HttpModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
