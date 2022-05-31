import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { WeatherData } from './models/weather.model';
import { WeatherService } from './services/weather.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title: string = 'Weather App';
  city: string | null = '';
  weatherData?: WeatherData;

  constructor(private weatherService: WeatherService) {}
  ngOnInit(): void {
    
  }
  handleSubmit(form: NgForm) {
    if (form.value.searchQuery) {
      this.weatherService.getWeatherData(form.value.searchQuery).subscribe({
        next: (response: WeatherData) => {
          this.weatherData = response;
          this.city = '';
        },
        error: (error) => {
          console.log(error);
        },
      });
    }
  }
}
