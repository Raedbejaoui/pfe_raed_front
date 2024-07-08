import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/store/Authentication/auth.models';
import {Observable, throwError} from "rxjs";
import {catchError} from "rxjs/operators";

@Injectable({ providedIn: 'root' })
export class UserProfileService {
    constructor(private http: HttpClient) { }
    /***
     * Get All User
     */

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>('http://localhost:8081/User/all');
  }
    /***
     * Facked User Register
     */
    register(user: User) {
        return this.http.post(`/users/register`, user);
    }
  blockUser(id: number): Observable<User> {
    console.log(id);
    return this.http.put<User>(`http://localhost:8081/User/block/${id}`, {}).pipe(
      catchError((error) => {
        console.error('An error occurred:', error);
        return throwError(error);
      })
    );
  }

  unblockUser(id: number): Observable<any> {
    console.log(id)
    return this.http.put<User>(`http://localhost:8081/User/unblock/${id}`,{});
  }
  getAllDomains(): Observable<string[]> {
  return this.http.get<string[]>('http://localhost:8081/User/getAllDomains');
}
}
