import { Injectable } from '@angular/core';
import { LoginDetails } from './sharedDetails.interface';
import { SharedDetails } from './sharedDetails.interface';
import { AuthenticationService } from './auth.service';
@Injectable()
export class SharedService {
  public sharedDetails: SharedDetails = {
    firstName: "",
    lastName: "",
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
    console.log(this.sharedDetails.isLoggedIn);
  }
  constructor(private authService: AuthenticationService) { }
}
