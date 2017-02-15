import { Component, OnInit } from '@angular/core';
import {Http} from '@angular/http';
import { contentHeaders } from '../common/headers';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private http: Http) {
}

  ngOnInit() {
  }

  login(event, userName, userPassword) {
    event.preventDefault();
    var loginInfo = [{name:'amalroyt',password:'#!lama'},{name:'sanjivanig',password:'@!sanju'},{name:'ritujas',password:'!!ritu'}];
    for (var val in loginInfo) {
      if ( loginInfo[val].name === userName && loginInfo[val].password === userPassword ) {
        window.location.href='http://localhost:4200/meetingList';
      }
    }

  }
}
