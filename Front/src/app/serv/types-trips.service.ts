import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TypesTrip } from '../classes/TypesTrip';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TypesTripsService {

  constructor(public http: HttpClient) { }

  getAllType():Observable<Array<TypesTrip>>
  {
    return this.http.get<Array<TypesTrip>>("https://localhost:7292/api/types-trips")
  }

  getTypesTripById(id: number): Observable<Array<TypesTrip>> {
    return this.http.get<Array<TypesTrip>>("https://localhost:7292/api/types-trips/${id}")
  }

  addTypeTrip(typesTrip: TypesTrip): Observable<Array<TypesTrip>> {
    return this.http.post<Array<TypesTrip>>("https://localhost:7292/api/types-trips", typesTrip)
  }

  updateTypesTrip(id: number, typesTrip: TypesTrip): Observable<Array<TypesTrip>> {
    return this.http.put<Array<TypesTrip>>("https://localhost:7292/api/types-trips${id}", typesTrip)
  }

  deleteTypesTrip(id: number): Observable<Array<TypesTrip>> {
    return this.http.delete<Array<TypesTrip>>("https://localhost:7292/api/types-trips/${id}")
  }

}
