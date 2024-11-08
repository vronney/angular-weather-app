import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ApixuService } from '../apixu.service';
import { ThemeService } from '../services/theme.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit {
  weatherSearchForm: FormGroup;
  weatherLocations: any[] = [];
  searchValue: string;
  isLoading: boolean = true;
  error: string | null = null;
  isDarkMode$ = this.themeService.isDarkMode$;

  constructor(
    private formBuilder: FormBuilder,
    private apixuService: ApixuService,
    private themeService: ThemeService
  ) { }

  ngOnInit(): void {
    this.weatherSearchForm = this.formBuilder.group({
      location: [''],
    });
    
    // Get user's location on init
    this.getUserLocation();
  }

  getUserLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const coords = {
            lat: position.coords.latitude,
            lon: position.coords.longitude
          };
          this.getWeatherByCoords(coords);
        },
        (error) => {
          this.error = 'Unable to get your location. Please search manually.';
          this.isLoading = false;
        }
      );
    } else {
      this.error = 'Geolocation is not supported by your browser.';
      this.isLoading = false;
    }
  }

  getWeatherByCoords(coords: {lat: number, lon: number}) {
    this.apixuService.getWeatherByCoords(coords)
      .subscribe(
        data => {
          this.addWeatherLocation(data);
          this.isLoading = false;
        },
        error => {
          this.error = 'Error fetching weather data.';
          this.isLoading = false;
        }
      );
  }

  sendToAPIXU(formValues) {
    this.apixuService
      .getWeather(formValues.location)
      .subscribe(
        data => this.addWeatherLocation(data),
        error => this.error = 'Location not found. Please try again.'
      );
    this.searchValue = '';
    this.weatherSearchForm.reset();
  }

  addWeatherLocation(data: any) {
    // Check if location already exists
    const exists = this.weatherLocations.some(
      location => location.data[0].city_name === data.data[0].city_name
    );
    
    if (!exists) {
      this.weatherLocations.push(data);
    }
  }

  removeLocation(index: number) {
    this.weatherLocations.splice(index, 1);
  }

  toggleTheme() {
    this.themeService.toggleTheme();
  }
}
