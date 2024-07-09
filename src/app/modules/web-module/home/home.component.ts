import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, IonicModule } from '@ionic/angular';
import { SwiperComponent, SwiperModule } from 'swiper/angular';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { HomeDataService } from 'src/app/services/home-data/home-data.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Home } from 'src/app/models/Home/home';
import { CommonModule } from '@angular/common';
import { BetQuiz } from 'src/app/models/BetQuiz/bet-quiz';
import { UserBetAnswer } from 'src/app/models/UserBetAnswer/user-bet-answer';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [IonicModule, SwiperModule, CommonModule, FormsModule],
  standalone: true
})
export class HomeComponent  implements OnInit {

  @ViewChild(IonModal) modal!: IonModal;
  @ViewChild('swiper') swiper!: SwiperComponent;

  config = {
    slidesPerView: 1,
    spaceBetween: 3,
    centeredSlides: true,
    loop: true,
  }

  animationInProgress = false;
  name!: string;
  isModalOpen = false;
  liveStreamUrl!: SafeResourceUrl;
  storedUserName!: any;

  homeDataInfoModel = new Home();
  quizModel = new BetQuiz();
  userQuizAnswer = new UserBetAnswer();
  selectedAnswer!: string;
  userBettingAmount!: string;

  constructor(private router: Router, private homeService: HomeDataService, public sanitizer: DomSanitizer, private alertController: AlertController) { }

  ngOnInit() {
    this.storedUserName = sessionStorage.getItem("userName");

    const iframe: any = document.querySelector('iframe');

    if (this.storedUserName == null || this.storedUserName == undefined) {
      this.router.navigate(['/login']);
    } else {
      this.router.navigate(['/home'])
    }
    this.loadHomeData();
  }

  goToBetHistory() {
    this.router.navigate(['/home/bet-summery'])
    return false;
  }

  onClickBuyMoreCoinBtn() {
    // await Browser.open({ url: 'https://union-transfer.co.uk/Home/Login' });
    window.open('https://union-transfer.co.uk/Home/Login', '_blank');
  }

  loadHomeData() {
    this.homeService.loadHomeData(this.storedUserName).subscribe((resp: any) => {
      if (resp.Flag == 100) {
        this.homeDataInfoModel.COIN_AMT = resp.Data[0].COIN_AMT;
        this.homeDataInfoModel.USER_NAME = resp.Data[0].USER_NAME;
        this.homeDataInfoModel.U_BET_QUIZ = resp.Data[0].U_BET_QUIZ;
        this.homeDataInfoModel.U_UP_COME = resp.Data[0].U_UP_COME;
        this.homeDataInfoModel.VIDEO_DATE = resp.Data[0].VIDEO_DATE;
        this.homeDataInfoModel.VIDEO_ID = resp.Data[0].VIDEO_ID;
        this.homeDataInfoModel.VIDEO_NAME = resp.Data[0].VIDEO_NAME;
        this.homeDataInfoModel.VIDEO_TYPE = resp.Data[0].VIDEO_TYPE;
        this.homeDataInfoModel.VIDEO_URL = resp.Data[0].VIDEO_URL;

        if (this.homeDataInfoModel.VIDEO_TYPE == 'Youtube') {
          const videoWithPrefix = "https://www.youtube.com/embed/" + this.homeDataInfoModel.VIDEO_URL;
          this.liveStreamUrl = this.sanitizer.bypassSecurityTrustResourceUrl(videoWithPrefix);
        } else if (this.homeDataInfoModel.VIDEO_TYPE == "Facebook") {
          const videoWithPrefix = "https://www.facebook.com/plugins/video.php?href=" + this.homeDataInfoModel.VIDEO_URL;
          this.liveStreamUrl = this.sanitizer.bypassSecurityTrustResourceUrl(videoWithPrefix);
        } else {
          this.liveStreamUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.homeDataInfoModel.VIDEO_URL);
        }
      } else {
        
      }
    })
  }

  /*
    @qId - need to pass to the function to get info about question
  */

  openQuizModel(betQuiz: BetQuiz, isOpen: boolean) {
    this.quizModel.U_QUIZ_ID = betQuiz.U_QUIZ_ID;
    this.quizModel.U_QUIZ_NAME = betQuiz.U_QUIZ_NAME;
    this.quizModel.U_QUIZ_ANSWERS = betQuiz.U_QUIZ_ANSWERS;
    this.isModalOpen = isOpen;
  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
    this.isModalOpen = false;
  }

  async presentAlert(subHeader: string, alertMessage: string) {
    const alert = await this.alertController.create({
      header: 'Alert',
      subHeader: subHeader,
      message: alertMessage,
      buttons: ['OK'],
    });

    await alert.present();
  }

  confirm() {
    this.modal.dismiss(this.name, 'confirm');
    
    this.userQuizAnswer.U_QUIZ_ID = this.quizModel.U_QUIZ_ID;
    this.userQuizAnswer.U_QUIZ_ANSWR = this.selectedAnswer;
    this.userQuizAnswer.U_BET_AMT = this.userBettingAmount;
    this.userQuizAnswer.U_USER = this.storedUserName;

    this.homeService.submitQuiz(this.userQuizAnswer).subscribe((resp: any) => {
      if (resp.Flag === 100) {
        this.presentAlert("Submit Bet Answer", "Answer Submitting Successfully.");
      } else {
        this.presentAlert("Submit Bet Answer", resp.ErrorMessage);
      }
    })

    this.isModalOpen = false;
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      
    }

    this.isModalOpen = false;
  }

}
