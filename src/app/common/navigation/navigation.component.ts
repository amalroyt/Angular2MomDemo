import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import { AuthenticationService } from '../../services/auth.service';
import { SharedService } from '../../services/sharedDetails.service';
import { Location } from '@angular/common';
import { contentHeaders } from '../headers';
import { ServerAddress } from '../serverAddress';
declare var d3: any;
import { RouterModule, Routes } from '@angular/router';
declare var $: any;
@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {
  public userDetails: any;
  public dateString: string;
  public timeString: string;
  constructor(private http: Http, public location: Location, public router: Router, private authService: AuthenticationService, private sharedService: SharedService) {
    this.userDetails = this.authService.getUserdetails();
    var date = new Date();
    this.dateString = ("0" + date.getDate().toString()).substr(-2) + "-" + ("0" + (date.getMonth() + 1).toString()).substr(-2) + "-" + (date.getFullYear().toString());
    var hours = date.getHours();
    var minutes = date.getMinutes();
    this.timeString = ((hours % 12) ? (hours % 12) : 12) + ':' + (minutes < 10 ? '0' + minutes : minutes) + ' ' + (hours >= 12 ? 'pm' : 'am');

    $(document).ready(function () {
      if ($('.dropDownNav').text() == '') {
        $(".dropDownNav").text('Meetinglist');
      }
      $(".dropdown-menu a.nav-link").on('click', function () {
        $(".dropDownNav").text($(this).text());
      });
    });
  }

  onLogout: () => any
  = function(): any {
    var token = this.authService.getToken();
    this.http.put(ServerAddress + '/logoutToken', JSON.stringify({ "token": this.authService.getToken() }), { headers: contentHeaders })
      .subscribe(
      response => {
        this.authService.logout();
        this.userDetails.firstName = "";
        this.sharedService.resetDetails();
        this.svgCleanUp();
        this.router.navigate(['/login']);
      },
      error => {
        console.log(error.text());
      });
  }
  svgCleanUp: () => void
  = function(): void {
    d3.select("svg").remove();
  }
}
