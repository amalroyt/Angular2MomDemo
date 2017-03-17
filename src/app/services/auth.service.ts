import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import { contentHeaders } from '../common/headers';
@Injectable()
export class AuthenticationService {
  constructor(private router: Router, private http: Http) { }

  login: (user) => boolean
  = function(user): boolean {
    console.log("login");
    user = JSON.stringify(user);
    var authenticatedUser = user;
    if (user) {
      localStorage.setItem("user", authenticatedUser);
      return true;
    }
    else {
      return false;
    }
  }
  checkCredentials: () => any
  = function(): any {
    if (localStorage.getItem("user") === null) {
      this.router.navigate(['/login']);
      return false;
    }
    else {
      return true;
    }
  }
  getUserdetails: () => any
  = function(): any {console.log("getuserdetails");
    this.storageVal = JSON.parse(localStorage.getItem("user"));
    console.log(this.storageVal);
    return this.storageVal[0];
  }
  logout: () => void
  = function(): void {
    localStorage.removeItem("user");
  }
}
