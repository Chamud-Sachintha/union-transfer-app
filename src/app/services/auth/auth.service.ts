import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Auth } from 'src/app/models/Auth/auth';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  authenticateUser(params: any) {
    const path = environment.appAPI + "/api/Login/checkLogin";

    let queryParams = new HttpParams();
    for (let key in params) {
      queryParams = queryParams.append(key, params[key]);
    }

    return this.http.get(path, { params: queryParams });
  }
}
