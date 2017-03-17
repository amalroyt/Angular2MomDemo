import { Injectable } from '@angular/core';
import { SharedDetails } from './sharedDetails.interface';
import { AuthenticationService } from './auth.service';
@Injectable()
export class SharedService {
  public sharedDetails: SharedDetails = {
    firstName: "",
    lastName: ""
  };
  setDetails(details) {
    console.log("inside set");
    console.log(details);
    this.sharedDetails.firstName = details.firstName;
    this.sharedDetails.lastName = details.lastName;
  }
  resetDetails() {
    this.sharedDetails.firstName = "";
    this.sharedDetails.lastName = "";
  }
  constructor(private authService: AuthenticationService) { }
}
