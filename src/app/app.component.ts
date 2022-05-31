import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { WeatherData } from './models/weather.model';
import { WeatherService } from './services/weather.service';
import { NgForm } from '@angular/forms';
import { HotToastService } from '@ngneat/hot-toast';
import { Content } from '@ngneat/overview';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title: string = 'Weather App';
  city: string | null = '';
  weatherData?: WeatherData;

  constructor(private weatherService: WeatherService, private toast: HotToastService) {}
  ngOnInit(): void {
    
  }
  handleSubmit(form: NgForm) {
    if (form.value.searchQuery) {
      this.weatherService.getWeatherData(form.value.searchQuery).subscribe({
        next: (response: WeatherData) => {
          this.weatherData = response;
          this.city = '';
          this.toast.success("Fetched!");
        },
        error: (error) => {
          if (error.status == 404) {
            this.toast.error(`${form.value.searchQuery} is not a valid city name!`);
          } else {
            this.toast.error('Please try again later!');
          }
        },
      });
    } else {
      this.toast.error("Please enter a city name!")
    }
  }
}
