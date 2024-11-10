import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
    
  private serverUrl = 'https://localhost:7292/api/upload';

  constructor(private http: HttpClient) { }

  uploadImage(file: File, id: number): Observable<any> {
    const formData = new FormData();

    formData.append('profile_picture', file);
    return this.http.post<any>(`https://localhost:7292/api/upload/${id}`, formData);
  }
  getAllImages(): Observable<string[]> {
    return this.http.get<string[]>(`https://localhost:7292/api/getAllImages`);
  }

}
