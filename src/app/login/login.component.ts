import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {Http} from '@angular/http';
import { Router} from '@angular/router';
import { contentHeaders } from '../common/headers';
import { User } from './login.interface';
import { AuthenticationService } from '../services/auth.service';
import { SharedService } from '../services/sharedDetails.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: FormGroup;
  constructor(private http: Http, private router: Router, private sharedService: SharedService, private authService: AuthenticationService) {
    document.getElementById("errorId").innerHTML = "";
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
    this.http.post('http://localhost:8081/login', JSON.stringify(this.user.value), { headers: contentHeaders })
      .subscribe(
      response => {
        if (response.json().token) {
          document.getElementById("errorId").innerHTML = "";
          if (this.authService.login(response.json().userDetails)) {
            this.sharedService.setDetails(this.authService.getUserdetails());
            this.sharedService.setLog(true);
            this.router.navigate(['/meetingList']);
          }
          else {
            this.router.navigate(['/login']);
          }
        }
      },
      error => {
        document.getElementById("errorId").innerHTML = "Enter Valid Credentials.";
        console.log(error.text());
      });
  }
}
