import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BetSummeryService {

  constructor(private http: HttpClient) { }

  getBetSummeryList(userName: any, date: string) {
    const path = environment.appAPI + "/api/Betting/BetSummary?" + "unameUs=" + userName + "&Edate=" + date;
    return this.http.get(path);
  }
}
