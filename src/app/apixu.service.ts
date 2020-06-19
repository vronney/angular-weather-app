import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { isNumber } from 'util';

@Injectable({
  providedIn: 'root'
})
export class ApixuService {

  constructor(private http: HttpClient) { }

  getWeather(location) {
    const numbersOnly = /^[0-9]/;
    // Will check if location values are numbers or a string
    // User can input postal code or name of city and state
    if (location.match(numbersOnly)) {
      return this.http.get(
        'https://api.weatherbit.io/v2.0/current?postal_code= ' + location + '&key=bb28421491794a85978d17ba66dab077&lang=en&units=I'
      );
    } else {
      return this.http.get(
        'https://api.weatherbit.io/v2.0/current?city= ' + location + '&key=bb28421491794a85978d17ba66dab077&lang=en&units=I'
      );
    }
  }

}
