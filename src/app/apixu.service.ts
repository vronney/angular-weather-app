import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { isNumber } from 'util';

@Injectable({
  providedIn: 'root'
})
export class ApixuService {
  private API_KEY = 'bb28421491794a85978d17ba66dab077';
  private BASE_URL = 'https://api.weatherbit.io/v2.0/current';

  constructor(private http: HttpClient) { }

  getWeatherByCoords(coords: {lat: number, lon: number}) {
    return this.http.get(
      `${this.BASE_URL}?lat=${coords.lat}&lon=${coords.lon}&key=${this.API_KEY}&units=I`
    );
  }

  getWeather(location) {
    const numbersOnly = /^[0-9]/;
    if (location.match(numbersOnly)) {
      return this.http.get(
        `${this.BASE_URL}?postal_code=${location}&key=${this.API_KEY}&units=I`
      );
    } else {
      return this.http.get(
        `${this.BASE_URL}?city=${location}&key=${this.API_KEY}&units=I`
      );
    }
  }
}
