var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { MoreDetailsPointsList } from './mock-moreDetailsPointsList';
var MoreDetailsPointsListService = (function () {
    function MoreDetailsPointsListService() {
    }
    MoreDetailsPointsListService.prototype.getMoreDetailsPointsList = function () {
        return Promise.resolve(MoreDetailsPointsList);
    };
    return MoreDetailsPointsListService;
}());
MoreDetailsPointsListService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [])
], MoreDetailsPointsListService);
export { MoreDetailsPointsListService };
//# sourceMappingURL=../../../../src/app/moreDetails/moreDetailsPointsList.service.js.map