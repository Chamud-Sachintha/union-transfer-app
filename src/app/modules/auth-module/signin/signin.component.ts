import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, IonicModule, Platform, isPlatform } from '@ionic/angular';
import { CommonModule, Location } from '@angular/common';
import { Auth } from 'src/app/models/Auth/auth';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule, ReactiveFormsModule, CommonModule]
})
export class SigninComponent  implements OnInit {

  clientLoginForm!: FormGroup;
  isShowPassword = false;

  isAlertOpen = false;
  public alertButtons = ['OK'];
  user !: any;
  userEmail!: string;

  fbUser = null;
  token!: any;
  isLoading!: boolean;
  timer: any = 0;

  authModel = new Auth();

  userEmailRegEx = new RegExp("[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}");

  constructor(private formBuilder: FormBuilder, private router: Router, private alertController: AlertController,
              private platform: Platform, private location: Location, private authService: AuthService) { 
    
    this.platform.backButton.subscribeWithPriority(10, () => {
      this.location.back();
    });
  }

  ngOnInit() {
    this.createSigninForm();

    const getTabBar = document.getElementById("testYYU");

    if (getTabBar != null) {
      getTabBar.style.display = "none";
    }

    if (sessionStorage.getItem("userName")) {
      this.router.navigate(['/home']);
    }
  }

  onClickCreateAccount($event: any) {
    $event.preventDefault()
    window.open('https://union-transfer.co.uk/Home/Signup', '_blank');
    // await Browser.open({ url: 'https://union-transfer.co.uk/Home/Signup' });
  }

  onClickViewPassword() {
    const eyeOnIcon = document.getElementById("eyeOn");
    const eyeOffIcon = document.getElementById("eyeOff");

    if (this.isShowPassword) {
      this.isShowPassword = false;
      
      if (eyeOnIcon != null && eyeOffIcon != null) {
        eyeOnIcon.style.display = "";
        eyeOffIcon.style.display = "none";
      }
    } else {
      this.isShowPassword = true;
      
      if (eyeOnIcon != null && eyeOffIcon != null) {
        eyeOnIcon.style.display = "none";
        eyeOffIcon.style.display = "";
      }
    }
  }

  checkSession() {
    const authToken = sessionStorage.getItem("authToken");

    if (authToken != null) {
      // this.router.navigate(['/book-list']);
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

  createSigninForm() {
    this.clientLoginForm = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  onSubmitClientLoginForm() {

    const userName = this.clientLoginForm.controls['userName'].value;
    const password = this.clientLoginForm.controls['password'].value;

    if (!navigator.onLine) {
      this.presentAlert("Unable to Sign in", "Please Check Your Connection");
    } else if (userName === "" || password === "") {
      this.presentAlert("Empty Field/s Detected", "Please FILL BOTH Fields");
    } else {
      this.authModel.U_USERNAME = userName;
      this.authModel.U_PASSWORD = password;

      this.authService.authenticateUser(this.authModel).subscribe((resp: any) => {
        if (resp.Flag == 100) {
          this.presentAlert("Authenticate User", "User Login Successfully.");
          sessionStorage.setItem("userName", userName);
          this.router.navigate(['home']);
        } else {
          this.presentAlert("Authenticate User", "Incorrect Username or Password");
        }
      })
    }
  }

}
