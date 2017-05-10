import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {Http} from '@angular/http';
import { AuthenticationService } from './services/auth.service';
import { SharedService } from './services/sharedDetails.service';
import { Location } from '@angular/common';
import { contentHeaders } from './common/headers';
declare var d3: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public userDetails: any;
  public isLog: any;
  public isAdmin: boolean;
  public dateString: string;
  public timeString: string;
  constructor(private http: Http, public location: Location, public router: Router, private authService: AuthenticationService, private sharedService: SharedService) {
    this.userDetails = this.sharedService.sharedDetails;
    this.isLog = this.sharedService.loginDetails;
    if (location.path() != "" && location.path() != "/login" && !this.userDetails.isLoggedIn && !this.userDetails.isLoginPage) {
      //To checkCredentials
      if (this.authService.checkCredentials()) {
        this.userDetails = this.authService.getUserdetails();
        this.userDetails.isLoggedIn = true;
        this.isLog.logValue = this.authService.checkCredentials();
      }
    }
    var date = new Date();
    this.dateString = ("0" + (date.getMonth() + 1).toString()).substr(-2) + "-" + ("0" + date.getDate().toString()).substr(-2) + "-" + (date.getFullYear().toString());
    var hours = date.getHours();
    var minutes = date.getMinutes();
    this.timeString = ((hours % 12) ? (hours % 12) : 12) + ':' + (minutes < 10 ? '0' + minutes : minutes) + ' ' + (hours >= 12 ? 'pm' : 'am');
  }
  onLogout: () => any
  = function(): any {
    var token = this.authService.getToken();
    this.http.put('http://localhost:8081/logoutToken', JSON.stringify({ "token": this.authService.getToken() }), { headers: contentHeaders })
      .subscribe(
      response => {
        this.authService.logout();
        this.userDetails.firstName = "";
        this.sharedService.resetDetails();
        this.svgCleanUp();
        this.router.navigate(['/login']);
      },
      error => {
        console.log(error.text());
      });
  }
  svgCleanUp: () => void
  = function(): void {
    d3.select("svg").remove();
  }
}
