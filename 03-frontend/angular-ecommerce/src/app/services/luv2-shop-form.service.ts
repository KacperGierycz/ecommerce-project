import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Country } from '../common/country';

@Injectable({
  providedIn: 'root'
})
export class Luv2ShopFormService {

private contriesUrl='http:/localhost:8080/api/countries';
private statesUrl='http:/localhost:8080/api/states';

constructor(private httpClient: HttpClient) { }

getCoutries(): Observable<Country[]>{

  return this.httpClient.get<GetResponseCountries>(this.contriesUrl).pipe(
    map(response=>response._embeded.coutries)
  );
}

  getCreditCardMonths(startMonth: number): Observable<number[]>{

    let data: number[]=[];

    // build a array fot "month" drompdown list 
    // - start at current month and loop until

    for(let theMonth=startMonth; theMonth<=12; theMonth++) {
      
      data.push(theMonth);
    }

    return of(data); 
  }

  getCreditCardYears(): Observable<number[]>{

    let data:number[]=[];

    // build an array for "Year" dropdown list
    // - start at current Year and loop over for 10 years

    const startYear:number = new Date().getFullYear();
    const endYear: number = startYear + 10; 

    for (let theYear=startYear; theYear<=endYear;theYear++){
      data.push(theYear);
    }

    return of(data);
  }



}

interface GetResponseCountries{

  _embeded:{
    coutries:Country[];
  }
}














