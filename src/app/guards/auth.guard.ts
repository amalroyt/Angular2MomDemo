import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthenticationService } from '../services/auth.service';
@Injectable()
export class AuthGuard implements CanActivate {
  public loggedIn: boolean;
  constructor(private authService: AuthenticationService) {
  }
  canActivate() {
    return this.authService.checkCredentials();
  }
}
