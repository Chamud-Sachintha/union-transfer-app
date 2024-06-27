import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HomeDataService {

  constructor(private http: HttpClient) { }

  loadHomeData(userName: any) {
    const path = environment.appAPI + "/api/MainPage/getMainpage?uname=" + userName;
    return this.http.get(path);
  }
}
