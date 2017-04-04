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
import { ActivatedRoute } from '@angular/router';
var MoreDetailsComponent = (function () {
    function MoreDetailsComponent(http, activatedRoute) {
        var _this = this;
        this.http = http;
        this.activatedRoute = activatedRoute;
        this.downloadPrevExcel = function (fileName) {
            var download = JSON.stringify({ fileName: fileName, meetingId: this.meetingId });
            this.http.get('http://localhost:8081/downloadPrev/' + download, { headers: contentHeaders })
                .subscribe(function (response) {
                window.location.href = "http://localhost:8081/downloadPrev/" + download;
                document.getElementById("errorId").innerHTML = "Download successfull.";
            }, function (error) {
                console.log(error.text());
            });
        };
        document.getElementById("errorId").innerHTML = "";
        this.activatedRoute.params.subscribe(function (params) {
            _this.meetingId = params['id'];
        });
        this.http.get('http://localhost:8081/moreDetails/' + this.meetingId, { headers: contentHeaders })
            .subscribe(function (response) {
            _this.moreDetailsList = response.json();
        }, function (error) {
            console.log(error.text());
        });
        this.http.get('http://localhost:8081/moreDetailsPoints/' + this.meetingId, { headers: contentHeaders })
            .subscribe(function (response) {
            _this.moreDetailsPointsList = response.json();
        }, function (error) {
            console.log(error.text());
        });
        this.http.get('http://localhost:8081/moreDetailsAction/' + this.meetingId, { headers: contentHeaders })
            .subscribe(function (response) {
            _this.moreDetailsActionList = response.json();
        }, function (error) {
            console.log(error.text());
        });
        this.http.get('http://localhost:8081/moreDetailsHistory/' + this.meetingId, { headers: contentHeaders })
            .subscribe(function (response) {
            _this.moreDetailsHistoryList = response.json();
        }, function (error) {
            console.log(error.text());
        });
    }
    MoreDetailsComponent.prototype.ngOnInit = function () { };
    return MoreDetailsComponent;
}());
MoreDetailsComponent = __decorate([
    Component({
        selector: 'app-moreDetails',
        templateUrl: './moreDetails.component.html',
        styleUrls: ['./moreDetails.component.css'],
        providers: []
    }),
    __metadata("design:paramtypes", [Http, ActivatedRoute])
], MoreDetailsComponent);
export { MoreDetailsComponent };
//# sourceMappingURL=../../../../src/app/moreDetails/moreDetails.component.js.map