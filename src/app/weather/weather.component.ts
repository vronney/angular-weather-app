import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ApixuService } from '../apixu.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit {

  weatherSearchForm: FormGroup;
  weatherData: any;
  searchValue: string;

  constructor(
    private formBuilder: FormBuilder,
    private apixuService: ApixuService
  ) { }

  ngOnInit(): void {
    this.weatherSearchForm = this.formBuilder.group({
      location: [''],
    });
  }

  sendToAPIXU(formValues) {
    this.apixuService
      .getWeather(formValues.location)
      .subscribe(
        data => this.weatherData = data);
    this.searchValue = '';
    console.log(this.weatherData);
  }

}
