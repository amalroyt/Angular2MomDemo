import { Injectable } from '@angular/core';
import { SharedDetails } from './sharedDetails.interface';
@Injectable()
export class SharedService {
  public sharedDetails: SharedDetails = {
    firstName: "",
    lastName: "",
    isAdmin: false,
    isLoggedIn: false,
    isLoginPage: false
  };
  setDetails: (details) => any
  = function(details): any {
    this.sharedDetails.firstName = details.firstName;
    this.sharedDetails.lastName = details.lastName;
    this.sharedDetails.isAdmin = details.isAdmin;
    this.sharedDetails.isLoggedIn = true;
  }
  resetDetails: () => any
  = function(): any {
    this.sharedDetails.firstName = "";
    this.sharedDetails.lastName = "";
    this.sharedDetails.isLoginPage = true;
    this.sharedDetails.isLoggedIn = false;
    this.sharedDetails.isAdmin = false;
  }
  constructor() { }
}
