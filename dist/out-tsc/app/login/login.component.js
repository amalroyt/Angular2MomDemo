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
import { Http } from '@angular/http';
var LoginComponent = (function () {
    function LoginComponent(http) {
        this.http = http;
    }
    LoginComponent.prototype.ngOnInit = function () {
    };
    LoginComponent.prototype.login = function (event, userName, userPassword) {
        event.preventDefault();
        var loginInfo = [{ name: 'amalroyt', password: '#!lama' }, { name: 'sanjivanig', password: '@!sanju' }, { name: 'ritujas', password: '!!ritu' }];
        for (var val in loginInfo) {
            if (loginInfo[val].name === userName && loginInfo[val].password === userPassword) {
                window.location.href = 'http://localhost:4200/meetingList';
            }
        }
    };
    return LoginComponent;
}());
LoginComponent = __decorate([
    Component({
        selector: 'app-login',
        templateUrl: './login.component.html',
        styleUrls: ['./login.component.css']
    }),
    __metadata("design:paramtypes", [Http])
], LoginComponent);
export { LoginComponent };
//# sourceMappingURL=../../../../src/app/login/login.component.js.map