import { Component } from '@angular/core';
import {Http} from '@angular/http';
import {contentHeaders } from '../common/headers';

import {MoreDetails} from './moreDetails/moreDetailsList';
import {MoreDetailsListService} from './moreDetails/moreDetailsList.service';

import {MoreDetailsPoints} from './moreDetailsPoints/moreDetailsPointsList';
import {MoreDetailsPointsListService} from './moreDetailsPoints/moreDetailsPointsList.service';

import {MoreDetailsAction} from './moreDetailsAction/moreDetailsActionList';
import {MoreDetailsActionListService} from './moreDetailsAction/moreDetailsActionList.service';

@Component({
  selector: 'app-moreDetails',
  templateUrl: './moreDetails.component.html',
  styleUrls: ['./moreDetails.component.css'],
  providers: [MoreDetailsListService,MoreDetailsPointsListService,MoreDetailsActionListService]
})
export class MoreDetailsComponent {
  public moreDetailsList: MoreDetails[];
  public moreDetailsPointsList: MoreDetailsPoints[];
  public moreDetailsActionList: MoreDetailsAction[];
  constructor(private _moreDetailsListService: MoreDetailsListService, private _moreDetailsPointsListService: MoreDetailsPointsListService, private _moreDetailsActionListService: MoreDetailsActionListService) {
    this.getMoreDetailsList();
    this.getMoreDetailsPointsList();
    this.getMoreDetailsActionList();
  }
  
  getMoreDetailsList() {
    this._moreDetailsListService.getMoreDetailsList().then((moreDetailsList: MoreDetails[]) => this.moreDetailsList = moreDetailsList);
    }

  getMoreDetailsPointsList() {
    this._moreDetailsPointsListService.getMoreDetailsPointsList().then((moreDetailsPointsList: MoreDetailsPoints[]) => this.moreDetailsPointsList = moreDetailsPointsList);
  }

  getMoreDetailsActionList() {
    this._moreDetailsActionListService.getMoreDetailsActionList().then((moreDetailsActionList: MoreDetailsAction[]) => this.moreDetailsActionList = moreDetailsActionList);
    console.log();
  }
}
