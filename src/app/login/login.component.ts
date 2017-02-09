import { Component, OnInit } from '@angular/core';
import {Http} from '@angular/http';
import { contentHeaders } from '../common/headers';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private http: Http) { }

  ngOnInit() {
  }

  login(event, userName, userPassword) {
    event.preventDefault();
    let body = JSON.stringify({ userName, userPassword });

  }
}
