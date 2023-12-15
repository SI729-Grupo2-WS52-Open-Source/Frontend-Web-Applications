import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl = environment.baseURL; // Variable para la URL base

  constructor(private http: HttpClient) { }

  updatePassword(email: string, oldPassword: string, newPassword: string): Observable<any> {
    const url = `${this.apiUrl}/update-password`;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    const body = {
      email: email,
      oldPassword: oldPassword,
      newPassword: newPassword
    };

    return this.http.put(url, null, { headers: headers, params: body });
  }
}
