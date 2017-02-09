/*
  MeetingList feature Module
*/
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MeetingListComponent } from '.';

import { RouterModule, Routes } from '@angular/router';

const loginRoutes: Routes = [
  { path: 'meetingList', component: MeetingListComponent}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(loginRoutes)
  ],
  declarations: [
    MeetingListComponent
  ]
})
export class MeetingListModule { }
