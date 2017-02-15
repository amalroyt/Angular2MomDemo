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
import { MoreDetailsListService } from './moreDetails/moreDetailsList.service';
import { MoreDetailsPointsListService } from './moreDetailsPoints/moreDetailsPointsList.service';
import { MoreDetailsActionListService } from './moreDetailsAction/moreDetailsActionList.service';
var MoreDetailsComponent = (function () {
    function MoreDetailsComponent(_moreDetailsListService, _moreDetailsPointsListService, _moreDetailsActionListService) {
        this._moreDetailsListService = _moreDetailsListService;
        this._moreDetailsPointsListService = _moreDetailsPointsListService;
        this._moreDetailsActionListService = _moreDetailsActionListService;
        this.getMoreDetailsList();
        this.getMoreDetailsPointsList();
        this.getMoreDetailsActionList();
    }
    MoreDetailsComponent.prototype.getMoreDetailsList = function () {
        var _this = this;
        this._moreDetailsListService.getMoreDetailsList().then(function (moreDetailsList) { return _this.moreDetailsList = moreDetailsList; });
    };
    MoreDetailsComponent.prototype.getMoreDetailsPointsList = function () {
        var _this = this;
        this._moreDetailsPointsListService.getMoreDetailsPointsList().then(function (moreDetailsPointsList) { return _this.moreDetailsPointsList = moreDetailsPointsList; });
    };
    MoreDetailsComponent.prototype.getMoreDetailsActionList = function () {
        var _this = this;
        this._moreDetailsActionListService.getMoreDetailsActionList().then(function (moreDetailsActionList) { return _this.moreDetailsActionList = moreDetailsActionList; });
        console.log();
    };
    return MoreDetailsComponent;
}());
MoreDetailsComponent = __decorate([
    Component({
        selector: 'app-moreDetails',
        templateUrl: './moreDetails.component.html',
        styleUrls: ['./moreDetails.component.css'],
        providers: [MoreDetailsListService, MoreDetailsPointsListService, MoreDetailsActionListService]
    }),
    __metadata("design:paramtypes", [MoreDetailsListService, MoreDetailsPointsListService, MoreDetailsActionListService])
], MoreDetailsComponent);
export { MoreDetailsComponent };
//# sourceMappingURL=../../../../src/app/moreDetails/moreDetails.component.js.map