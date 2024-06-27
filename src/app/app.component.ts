import { Component, OnInit } from '@angular/core';
import { Platform, ToastController } from '@ionic/angular';
import { Location } from '@angular/common'; 
import { Router } from '@angular/router';
import { App } from '@capacitor/app';
import { BackgroundTask } from '@capawesome/capacitor-background-task';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})

export class AppComponent implements OnInit {

  isToastAppear = false;

  constructor(private platform: Platform, private location: Location, private toastController: ToastController) {
    this.initializeApp();
  }

  ngOnInit(): void {
    
  }

  initializeApp() {
    const _this = this;
    this.platform.ready().then(() => {
      this.platform.backButton.subscribeWithPriority(9999, () => {
        document.addEventListener('backbutton', function (event) {
          event.preventDefault();
          event.stopPropagation();

          if (!_this.isToastAppear) {
            _this.presentToast('bottom', "Please Go Back Through App")
          }
          
        }, false);
      });
    });
  }

  async presentToast(position: 'top' | 'middle' | 'bottom', message: string) {
    this.isToastAppear = true;
    const toast = await this.toastController.create({
      message: message,
      duration: 1500,
      position: position,
      cssClass: 'custom-toast', 
    }).then(toast => {
      toast.present();
      return toast.onDidDismiss();
    }).then(() => {
      this,this.isToastAppear = false;
    });
  }
}
