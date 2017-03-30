import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './services/auth.service';
import { SharedService } from './services/sharedDetails.service';
import { Location } from '@angular/common';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public userDetails: any;
  public isLog: any;
  constructor(public location: Location, public router: Router, private authService: AuthenticationService, private sharedService: SharedService) {
    this.userDetails = this.sharedService.sharedDetails;
    this.isLog = this.sharedService.loginDetails;
    if (location.path() != "" && location.path() != "/login" && !this.userDetails.isLoggedIn && !this.userDetails.isLoginPage) {
      this.userDetails = this.authService.getUserdetails();
      this.userDetails.isLoggedIn = true;
      this.isLog.logValue = this.authService.checkCredentials();
      //console.log(this.isLog.logValue);
    }
    //console.log(this.isLog.logValue);
  }
  onLogout: () => any
  = function(): any {
    this.authService.logout();
    this.isLog.logValue = this.authService.checkCredentials();
    this.router.navigate(['/login']);
  }
}
