import { Injectable } from '@angular/core';
import { Router, ActivatedRoute, CanActivate } from '@angular/router';
import { Location } from '@angular/common';
import { AuthenticationService } from '../services/auth.service';
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private location: Location, private authService: AuthenticationService) {
  }
  canActivate() {
    // console.log(this.router.url);
    // console.log(this.location.path());
    return this.authService.checkCredentials();
  }
}
