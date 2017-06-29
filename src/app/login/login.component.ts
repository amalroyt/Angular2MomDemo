import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {Http} from '@angular/http';
import { Router} from '@angular/router';
import { contentHeaders } from '../common/headers';
import { User } from './login.interface';
import { AuthenticationService } from '../services/auth.service';
import { SharedService } from '../services/sharedDetails.service';
import { Location } from '@angular/common';
import { ServerAddress } from '../common/serverAddress';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: FormGroup;
  constructor(private http: Http, private router: Router, private authService: AuthenticationService,  private sharedService: SharedService) {
    if ( this.authService.checkCredentials() ) {
      this.authService.logout();
      this.sharedService.resetDetails();
    }
  }
  ngOnInit() {
    this.user = new FormGroup({
      userName: new FormControl('', Validators.required),
      userPassword: new FormControl('', Validators.required)
    });
  }
  //ON submit the username and password is verified
  onSubmit: () => void
  = function(): void {
    this.http.post(ServerAddress + '/login', JSON.stringify(this.user.value), { headers: contentHeaders })
      .subscribe(
      response => {
        this.toVerify(response.json());
      },
      error => {
        document.getElementById("loginError").innerHTML = "Enter Valid Credentials.";
        console.log(error.text());
      });
  }

  //To verify the token and to set values
  toVerify: (res) => void
  = function(res): void {
    if (res.token) {
      document.getElementById("errorId").innerHTML = "";
      if (this.authService.login(res)) {
        this.sharedService.setDetails(this.authService.getUserdetails());
        this.sharedService.setLog(true);
        this.router.navigate(['/meetingList']);
      }
      else {
        this.router.navigate(['/login']);
      }
    }
  }
}
