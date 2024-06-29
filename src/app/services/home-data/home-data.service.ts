import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserBetAnswer } from 'src/app/models/UserBetAnswer/user-bet-answer';
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

  submitQuiz(userBetAnswerModel: UserBetAnswer) {
    const path = environment.appAPI + "/api/Betting/betAmount";
    return this.http.post(path, userBetAnswerModel);
  }
}
