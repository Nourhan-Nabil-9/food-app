import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
private readonly httpClient =inject(HttpClient);

  getAllUsers(): Observable<any> {
    return this.httpClient.get('users');
  }
  deleteUser(id: number): Observable<any> {
  return this.httpClient.delete(`users/${id}`);
}
getUserById(id:number):Observable<any>{
return this.httpClient.get(`users/${id}`)
}
}
