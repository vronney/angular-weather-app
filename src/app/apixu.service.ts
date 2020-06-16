import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApixuService {

  constructor(private http: HttpClient) { }

  getWeather(location) {
    return this.http.get(
      'http://api.weatherstack.com/current?access_key=de502a1cf3d0ed2534f3065b7e9a669d&query=' + location + '&units=f'
    );
  }

}
