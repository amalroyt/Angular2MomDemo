import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthenticationService } from '../services/auth.service';
import { Router} from '@angular/router';
@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private authService: AuthenticationService, private router: Router) {
  }
  canActivate() {
    if ( !this.authService.checkAdmin() ) {
      this.router.navigate(['/login']);
    }
    return this.authService.checkAdmin();
  }
}
