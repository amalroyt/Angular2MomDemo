import { Injectable } from '@angular/core';
import { SharedDetails } from './sharedDetails.interface';
import { AuthenticationService } from './auth.service';
@Injectable()
export class SharedService {
  public sharedDetails: SharedDetails = {
    firstName: "",
    lastName: ""
  };
  
  setDetails: (details) => any
  = function(details): any {
    this.sharedDetails.firstName = details.firstName;
    this.sharedDetails.lastName = details.lastName;
  }

  resetDetails: () => any
  = function(): any {
    this.sharedDetails.firstName = "";
    this.sharedDetails.lastName = "";
  }
  constructor(private authService: AuthenticationService) { }
}
