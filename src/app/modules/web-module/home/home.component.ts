import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { SwiperComponent, SwiperModule } from 'swiper/angular';
import {  SlideToConfirmModule } from 'ngx-slide-to-confirm';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { HomeDataService } from 'src/app/services/home-data/home-data.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [IonicModule, SwiperModule, SlideToConfirmModule],
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

  constructor(private router: Router, private homeService: HomeDataService, public sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.liveStreamUrl = this.sanitizer.bypassSecurityTrustResourceUrl('https://player003.vip/embed2.php?id=willow&q=Willow Cricket');
    this.loadHomeData();
  }

  loadHomeData() {
    this.homeService.loadHomeData("bwayne").subscribe((resp: any) => {
      console.log(resp)
    })
  }

  /*
    @qId - need to pass to the function to get info about question
  */

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
    this.isModalOpen = false;
  }

  confirm() {
    this.modal.dismiss(this.name, 'confirm');
    this.isModalOpen = false;
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      
    }

    this.isModalOpen = false;
  }

}
