import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import { contentHeaders } from '../common/headers';
@Injectable()
export class AuthenticationService {
  constructor(private router: Router, private http: Http) { }

  login: (user) => boolean
  = function(user): boolean {
    var authenticatedUser = JSON.stringify(user.userDetails);
    var authenticatedToken = JSON.stringify(user.token);
    if (authenticatedUser) {
      localStorage.setItem("user", authenticatedUser);
      localStorage.setItem("token", authenticatedToken);
      return true;
    }
    else {
      return false;
    }
  }
  checkCredentials: () => boolean
  = function(): boolean {
    if (localStorage.getItem("user") === null) {
      this.router.navigate(['/login']);
      return false;
    }
    else {
      return true;
    }
  }
  getUserdetails: () => any
  = function(): any {
    this.storageVal = JSON.parse(localStorage.getItem("user"));
    return this.storageVal[0];
  }
  getToken: () => any
  = function(): any {
    this.storageVal = JSON.parse(localStorage.getItem("token"));
    return this.storageVal;
  }
  logout: () => void
  = function(): void {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  }
}
