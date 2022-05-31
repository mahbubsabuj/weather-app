import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { WeatherData } from './models/weather.model';
import { WeatherService } from './services/weather.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title: string = 'Weather App';
  weatherData?: WeatherData;
  constructor(private weatherService: WeatherService) {}
  ngOnInit(): void {
    this.weatherService.getWeatherData('dhaka').subscribe({
      next: (response: WeatherData) => {
        this.weatherData = response;
        console.log(response);
      },
      error: (error) => {
        console.log(error);
      }
    })
  }
}
