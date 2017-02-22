import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {Http} from '@angular/http';
import { Router} from '@angular/router';
import { contentHeaders } from '../common/headers';
import { User } from './login.interface';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: FormGroup;
  constructor(private http: Http, private router: Router) { }
  ngOnInit() {
    this.user = new FormGroup({
      userName: new FormControl('', Validators.required),
      userPassword: new FormControl('', Validators.required)
    });
  }
  //ON submit the username and password is verified
  onSubmit: () => void
  = function(): void {
    console.log(this.user.value);
    this.http.post('http://localhost:8081/login', JSON.stringify(this.user.value), { headers: contentHeaders })
      .subscribe(
      response => {
        console.log(response.json().token);
        if (response.json().token) {
          this.router.navigate(['/meetingList']);
        }
      },
      error => {
        console.log(error.text());
      });
  }
}
