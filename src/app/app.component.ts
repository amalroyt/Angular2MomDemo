import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './services/auth.service';
import { SharedService } from './services/sharedDetails.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public userDetails: any;
  constructor(public router: Router, private authService: AuthenticationService, private sharedService: SharedService) {
    this.userDetails = this.sharedService.sharedDetails;
  }

  onLogout: () => any
  = function(): any {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
