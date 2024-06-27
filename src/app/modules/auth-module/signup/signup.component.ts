import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AlertController, IonicModule, Platform } from '@ionic/angular';
import { App as CapacitorApp } from '@capacitor/app';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule, ReactiveFormsModule]
})
export class SignupComponent  implements OnInit {

  clientRegisterForm!: FormGroup;
  userEmailRegEx = new RegExp("[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}");
  mobileNumberRegEx = new RegExp("");

  constructor(private formBuilder: FormBuilder, private alertController: AlertController
              , private location: Location, private platform: Platform, private router: Router) { 

    this.platform.backButton.subscribeWithPriority(10, () => {
      this.location.back();
    });
  }

  ngOnInit() {
    this.initClientRegisterForm();

    const getTabBar = document.getElementById("testYYU");

    console.log(getTabBar)

    if (getTabBar != null) {
      getTabBar.style.display = "none";
    }
  }

  initClientRegisterForm() {
    this.clientRegisterForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      emailAddress: ['', Validators.required],
      password: ['', Validators.required],
      confPassword: ['', Validators.required]
    })
  }

  onSubmitCreateAccount() {
    const firstName = this.clientRegisterForm.controls['firstName'].value;
    const lastName = this.clientRegisterForm.controls['lastName'].value;
    const emailAddress = this.clientRegisterForm.controls['emailAddress'].value;
    const password = this.clientRegisterForm.controls['password'].value;
    const confPassword = this.clientRegisterForm.controls['confPassword'].value;

    if (!this.userEmailRegEx.test(emailAddress)) {
      this.presentAlert("Invalid Input Format", "Enter Valid Email Address");
    } else if (firstName === "") {
      this.presentAlert("Empty Field/s Detected", "Please FILL ALL Listed Fields")
    } else if (lastName === "") {
      this.presentAlert("Empty Field/s Detected", "Please FILL ALL Listed Fields")
    } else if (emailAddress === "") {
      this.presentAlert("Empty Field/s Detected", "Please FILL ALL Listed Fields")
    } else if (password === "") {
      this.presentAlert("Empty Field/s Detected", "Please FILL ALL Listed Fields")
    } else if (password !== confPassword) {
      this.presentAlert("Unable to Create Password", "Password Fields Don’t Match");
    } else {
    }
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

}
