import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TypesTrip } from '../classes/TypesTrip';

@Injectable({
  providedIn: 'root'
})
export class TypeTripService {

  constructor(public http:HttpClient) { }

  getAllType():Observable<Array<TypesTrip>>
 {
   return this.http.get<Array<TypesTrip>>("https://localhost:7292/api/types-trips")
 }
}
