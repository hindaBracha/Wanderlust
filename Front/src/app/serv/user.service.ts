import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../classes/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(public http: HttpClient) { }
  currentuser: User = new User(-1)
  currentimg: string = "../../../assets/pic/פרופילמשתמש.png"
  getAllUsers(): Observable<Array<User>> {
    debugger
    return this.http.get<Array<User>>("https://localhost:7292/api/users")
  }

  getUserById(email: string, pass: string): Observable<User> {
    return this.http.get<User>(`https://localhost:7292/api/users/byPass?email=${email}&password=${pass}`)
  }

  addUser(User: User): Observable<number> {

    // return this.http.post<Array<User>>("https://localhost:7292/api/${User}")
    return this.http.post<number>("https://localhost:7292/api/users", User)
  }

  updateUser(id: number, User: User): Observable<boolean> {
    debugger
    return this.http.put<boolean>(`https://localhost:7292/api/users/${id}`, User)

  }

  deleteUser(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`https://localhost:7292/api/users/${id}`)
  }

  getAllTripsForUser(id: number): Observable<Array<User>> {
    return this.http.get<Array<User>>(`https://localhost:7292/api/users/${id}/trips`)
  }
  setCurrentuser(user: User,) {
    this.currentuser = user;
  }
  getCurrentuser() {
    return this.currentuser;
  }
  setcurrentimg(Img: string) {
    if (this.currentuser.id + "" == localStorage.getItem('manager'))
      this.currentimg = "../../../assets/pic/מנהל.png"
    else
      this.currentimg = Img
  }
  getcurrentimg() {
    return this.currentimg
  }

}
