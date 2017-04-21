import { Injectable } from '@angular/core';
import { LoginDetails } from './sharedDetails.interface';
import { SharedDetails } from './sharedDetails.interface';
import { AuthenticationService } from './auth.service';
@Injectable()
export class SharedService {
  public sharedDetails: SharedDetails = {
    firstName: "",
    lastName: "",
    isAdmin: false,
    isLoggedIn: false,
    isLoginPage: false
  };
  public loginDetails: LoginDetails = {
    logValue: false
  };
  setDetails: (details) => any
  = function(details): any {
    this.sharedDetails.firstName = details.firstName;
    this.sharedDetails.lastName = details.lastName;
    this.sharedDetails.isAdmin = details.isAdmin;
    this.sharedDetails.isLoggedIn = true;
  }
  setLog: (val: boolean) => any
  = function(val: boolean): any {
    this.loginDetails.logValue = val;
  }
  resetDetails: () => any
  = function(): any {
    this.sharedDetails.firstName = "";
    this.sharedDetails.lastName = "";
    this.sharedDetails.isLoginPage = true;
    this.sharedDetails.isLoggedIn = false;
    this.sharedDetails.isAdmin = false;
    console.log("inside reset " + this.sharedDetails.isAdmin);
  }
  constructor(private authService: AuthenticationService) { }
}
