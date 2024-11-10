import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Trip } from '../classes/Trip';
@Injectable({
  providedIn: 'root'
})
export class TripService {

  constructor(public http:HttpClient) { }

  getAllTrips():Observable<Array<Trip>>
  {
    return this.http.get<Array<Trip>>("https://localhost:7292/api/trips")
    
  }
  getTripById(id:number):Observable<Trip>
  {
    return this.http.get<Trip>(`https://localhost:7292/api/trips/${id}`)
    
    
  }
}
