/*
  MeetingList feature Module
*/
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MeetingListComponent } from '.';

import { RouterModule, Routes } from '@angular/router';

const loginRoutes: Routes = [
  { path: 'meetingList', component: MeetingListComponent }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(loginRoutes)
  ],
  declarations: [
    MeetingListComponent
  ]
})
export class MeetingListModule { }
