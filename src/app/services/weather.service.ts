import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Weather, WeatherData } from '../models/weather.model';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  url: string = 'https://community-open-weather-map.p.rapidapi.com/weather';
  constructor(private httpClient: HttpClient) { }
  getWeatherData (city: string): Observable<WeatherData> {
    return this.httpClient.get<WeatherData>(environment.weatherApiBaseURL, {
      headers: new HttpHeaders().set(
        environment.XRapidAPIHostName, environment.XRapidAPIHostValue
      ).set(environment.XRapidAPIKeyName, environment.XRapidAPIKeyValue),
      params: new HttpParams().set('q', city).set('units', 'metric').set('mode', 'json')
    });
  }
}
