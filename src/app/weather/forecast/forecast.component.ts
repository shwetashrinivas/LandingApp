import { Component, OnInit } from '@angular/core';
import { ForecastService } from '../forecast.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.css']
})
export class ForecastComponent implements OnInit {

  // forecastData = [];
  // constructor(forecastService: ForecastService) {
  //   forecastService.getForecast()
  //     .subscribe( forecastData => {
  //       this.forecastData = forecastData;
  //     });
  // }


  //Using async pipe

  forecast$: Observable<{dateString: string; temp:number}[]>;

  constructor(forecastService: ForecastService ){
    this.forecast$ = forecastService.getForecast();
  }

  ngOnInit(): void {
  }

}
