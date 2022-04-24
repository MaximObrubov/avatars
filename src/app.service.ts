import { Injectable } from '@nestjs/common';
import { map } from 'rxjs/operators';
import { HttpService } from '@nestjs/axios';
import { Observable } from 'rxjs';
import { AxiosResponse } from 'axios';


@Injectable()
export class AppService {

  PIC_SERVICE_URL = `${process.env.IMAGE_GEN_HOST}`;

  constructor(private http: HttpService) {}

  getHello(): string {
    return 'Hello World!';
  }

  // TODO: probably don't needed
  getPic(name: string): Observable<AxiosResponse<ImageBitmap>> {
    return this.http.get(`${this.PIC_SERVICE_URL}/${name}`).pipe(
      map((axiosResponse: AxiosResponse) => {
        return axiosResponse.data;
      })
    );
  }
}
