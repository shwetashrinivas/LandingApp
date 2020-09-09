import { Injectable } from '@angular/core';
import { HttpParams , HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, switchMap, pluck, mergeMap, filter, toArray, share } from 'rxjs/operators';

interface OpenWeatherResponse{
  list: {
    dt_txt: string,
    main: {
      temp: number;
    }
  }[]
}


@Injectable({
  providedIn: 'root' 
})
export class ForecastService {

  private url ='https://api.openweathermap.org/data/2.5/forecast'

  constructor(private http: HttpClient) { }

  //Take coords (lat/long) and pass it to map operator and then send it to HttpParams which will finally pass it to switchMap operator.

  getForecast(){
    return this.getCurrentLocation()
      .pipe(
        map(coords => {
          return new HttpParams()
            .set('lat', String(coords.latitude))
            .set('lon', String(coords.longitude))
            .set('units', 'metric')
            .set('appid', 'c895dec1aca96c7da64148797591cfa6')
        }),
        switchMap(params => 
          this.http.get<OpenWeatherResponse>(this.url , {params : params})//gets weatherResponse observable
        ), 
        // map((response: OpenWeatherResponse) => {
        //   response.list;
        // })
        pluck('list'),
        mergeMap(value => of(...value)),
        filter((value , index) => 
          //to return every 8th forecast record
          index % 8 === 0 
        ),
        map(value => {
          return{
            dateString: value.dt_txt,
            temp: value.main.temp
          };
        }),
        toArray(),
        share()
      );
  }

/*  getCurrentLocation() {
    window.navigator.geolocation.getCurrentPosition(
      (position) => {
        this.position = position,
        getForecastData();
      }
    );
  } */

  //Angular way
  getCurrentLocation(){
    return new Observable<Coordinates>( observer => {
      window.navigator.geolocation.getCurrentPosition(
        position => {
          observer.next(position.coords);
          observer.complete();
        },
        err => observer.error(err)
      );
    });
  }



}
