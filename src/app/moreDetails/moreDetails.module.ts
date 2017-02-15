/*
  MoreDetails feature Module
*/
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoreDetailsComponent } from '.';

import { RouterModule, Routes } from '@angular/router';

const loginRoutes: Routes = [
  { path: 'moreDetails', component: MoreDetailsComponent}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(loginRoutes)
  ],
  declarations: [
    MoreDetailsComponent
  ]
})
export class MoreDetailsModule { }
