import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Auth } from 'src/app/models/Auth/auth';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  authenticateUser(authModel: Auth) {
    const path = environment.appAPI + "/api/Login/checkLogin";
    return this.http.post(path, authModel);
  }

  isClientLoggedIn() {
    var userName = sessionStorage.getItem("userName");

    if (userName != null) {
      return true;
    } else {
      return false;
    }
  }
}
