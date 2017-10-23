import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ServerAddress } from '../common/serverAddress';
import { contentHeaders } from '../common/headers';
import { Http } from '@angular/http';
import { Router, ActivatedRoute, Params } from '@angular/router';
@Component({
  selector: 'createUser',
  templateUrl: './createUser.component.html',
  styleUrls: ['./createUser.component.css']
})
export class CreateUserComponent implements OnInit {
  user: FormGroup;
  passwordValidationFailed: false;
  userNameValidationFailed: false;
  userRoles: any;
  constructor(private http: Http, private router: Router) {
    //To get userroles
    this.http.get(ServerAddress + '/getUserRoles', { headers: contentHeaders })
      .subscribe(
      response => {
        this.userRoles = response.json();
      },
      error => {
        console.log(error.text());
      });
   }

  ngOnInit() {
    this.user = new FormGroup({
      empId: new FormControl('', Validators.required),
      emailId: new FormControl('', Validators.required),
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      userName: new FormControl('', Validators.required),
      role: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      rePassword: new FormControl('', Validators.required)
    });
  }

  //ON submit to create new user
  onSubmit: () => void
  = function(): void {
         this.http.post(ServerAddress + '/createUser', JSON.stringify(this.user.value), { headers: contentHeaders })
         .subscribe(
           response => {
             this.router.navigate(['/meetingList']);
             document.getElementById('successId').innerHTML = "User Registered Successfully!!";
             setTimeout(function() {
              document.getElementById("successId").innerHTML = ""; }, 5000);
           },
           error => {
             console.log(error.text());
           });
         }


  checkUsername: () => any
  = function(): any {
    this.http.put(ServerAddress + '/checkUsername', JSON.stringify({userName : this.user.value.userName}), { headers: contentHeaders })
      .subscribe(
      response => {
        if ( response.json()[0].userCount == 0 ) {
          this.userNameValidationFailed = false;
        }
        else {
          this.userNameValidationFailed = true;
        }
      },
      error => {
        console.log(error.text());
      });
  }

  checkPassword: () => any
  = function(): any {
    // alert("check"+ "  " +this.user.value.password == this.user.value.rePassword);
    if ( this.user.value.password == this.user.value.rePassword ) {
      this.passwordValidationFailed = false;
    }
    else {
      this.passwordValidationFailed = true;
    }
  }

  exitRegister: () => any
  = function(): any {
    this.router.navigate(['/meetingList']);
    document.getElementById('errorId').innerHTML = "User Registeration Cancelled.";
    setTimeout(function() {
     document.getElementById("errorId").innerHTML = ""; }, 5000);
  }


}
