import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { BetSummery } from 'src/app/models/BetSummery/bet-summery';
import { BetSummeryService } from 'src/app/services/bet-summery/bet-summery.service';

@Component({
  selector: 'app-bet-summery',
  templateUrl: './bet-summery.component.html',
  styleUrls: ['./bet-summery.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
  providers: [DatePipe]
})
export class BetSummeryComponent  implements OnInit {

  betSummeryInfoModel = new BetSummery();
  storedUsername!: any;
  filterDate!: any;

  constructor(private betSummeryService: BetSummeryService, private datePipe: DatePipe) { }

  ngOnInit() {
    this.storedUsername = sessionStorage.getItem("userName");
    this.filterDate = this.datePipe.transform((new Date()), 'yyyy-MM-dd');

    this.loadBetSummeryDetails();
  }

  loadBetSummeryDetails() {
    this.betSummeryService.getBetSummeryList(this.storedUsername, this.filterDate).subscribe((resp: any) => {
      if (resp.Flag === 100) {
        this.betSummeryInfoModel.U_SUM_QUIZ = resp.Data[0].U_SUM_QUIZ;
        this.betSummeryInfoModel.U_SUM_VID_NAME = resp.Data[0].U_SUM_VID_NAME;
        this.betSummeryInfoModel.U_SUM_VID_DATE = resp.Data[0].U_SUM_VID_DATE;
      }
    })
  }

}
