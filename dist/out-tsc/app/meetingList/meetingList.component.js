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
import { contentHeaders } from '../common/headers';
import { Router } from '@angular/router';
var MeetingListComponent = (function () {
    function MeetingListComponent(http, router) {
        var _this = this;
        this.http = http;
        this.router = router;
        this.moreDetails = function (id) {
            this.router.navigate(['/moreDetails', id]);
        };
        this.generateExcel = function (meetingId) {
            var _this = this;
            this.http.post('http://localhost:8081/generateExcel/' + meetingId, { headers: contentHeaders })
                .subscribe(function (response) {
                alert("Excel file generated Successfully!");
                _this.meetingList = response.json();
            }, function (error) {
                console.log(error.text());
            });
        };
        this.downloadExcel = function (meetingTitle) {
            this.http.get('http://localhost:8081/download/' + meetingTitle, { headers: contentHeaders })
                .subscribe(function (response) {
                window.location.href = "http://localhost:8081/download/" + meetingTitle;
            }, function (error) {
                console.log(error.text());
            });
        };
        this.http.get('http://localhost:8081/meetingList', { headers: contentHeaders })
            .subscribe(function (response) {
            _this.meetingList = response.json();
        }, function (error) {
            console.log(error.text());
        });
    }
    return MeetingListComponent;
}());
MeetingListComponent = __decorate([
    Component({
        selector: 'app-meetingList',
        templateUrl: './meetingList.component.html',
        styleUrls: ['./meetingList.component.css'],
        providers: []
    }),
    __metadata("design:paramtypes", [Http, Router])
], MeetingListComponent);
export { MeetingListComponent };
//# sourceMappingURL=../../../../src/app/meetingList/meetingList.component.js.map