var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { contentHeaders } from '../common/headers';
import { AuthenticationService } from '../services/auth.service';
import { SharedService } from '../services/sharedDetails.service';
var LoginComponent = (function () {
    function LoginComponent(http, router, sharedService, authService) {
        this.http = http;
        this.router = router;
        this.sharedService = sharedService;
        this.authService = authService;
        this.onSubmit = function () {
            var _this = this;
            this.http.post('http://localhost:8081/login', JSON.stringify(this.user.value), { headers: contentHeaders })
                .subscribe(function (response) {
                console.log(response.json().userDetails);
                if (response.json().token) {
                    if (_this.authService.login(response.json().userDetails)) {
                        console.log(_this.authService.getUserdetails());
                        _this.sharedService.setDetails(_this.authService.getUserdetails());
                        _this.router.navigate(['/meetingList']);
                    }
                    else {
                        _this.router.navigate(['/login']);
                    }
                }
            }, function (error) {
                console.log(error.text());
            });
        };
    }
    LoginComponent.prototype.ngOnInit = function () {
        this.user = new FormGroup({
            userName: new FormControl('', Validators.required),
            userPassword: new FormControl('', Validators.required)
        });
    };
    return LoginComponent;
}());
LoginComponent = __decorate([
    Component({
        selector: 'app-login',
        templateUrl: './login.component.html',
        styleUrls: ['./login.component.css']
    }),
    __metadata("design:paramtypes", [Http, Router, SharedService, AuthenticationService])
], LoginComponent);
export { LoginComponent };
//# sourceMappingURL=../../../../src/app/login/login.component.js.map