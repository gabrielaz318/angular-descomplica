import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { UserAuth } from '../models/userAuth';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  BASE_URL: string = 'http://localhost:3000';
  TOKEN_FIREBASE: string = 'TOKEN_PARA_GERAR';
  FIREBASE_URL: string = 'URL_PARA_GERAR';

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]>{
    return this.http.get<User[]>(this.BASE_URL + '/users');
  }

  login(data: any): Observable<UserAuth>{
    return this.http.post<UserAuth>(this.FIREBASE_URL + '/' + this.TOKEN_FIREBASE, data, httpOptions);
  }

  addUser(user: User): Observable<User>{
    return this.http.post<User>(this.BASE_URL + '/users', user, httpOptions);
  }

  editUser(user: User): Observable<User>{
    return this.http.put<User>(this.BASE_URL + '/users/' + user.id, user, httpOptions);
  }

  deleteUser(user: User): Observable<User>{
    return this.http.delete<User>(this.BASE_URL + '/users/' + user.id, httpOptions);
  }
}
