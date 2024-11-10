import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Orders } from '../classes/Orders';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private apiUrl = 'https://localhost:7292/api/orders';

  constructor(private http: HttpClient) { }

  getAllOrders(): Observable<Array<Orders>> {
    debugger
    return this.http.get<Array<Orders>>('https://localhost:7292/api/orders');
  }

  getOrderById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  addOrder(order: Orders): Observable<number> {
    return this.http.post<number>(`${this.apiUrl}`, order);
  }

  deleteOrder(id: number): Observable<boolean> {
    debugger
    return this.http.delete<boolean>(`${this.apiUrl}/${id}`);
  }

  getAllOrdersToTrip(tripId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/trip/${tripId}`);
  }  
}
