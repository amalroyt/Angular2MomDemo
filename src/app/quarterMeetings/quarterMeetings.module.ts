/*
  Home feature Module
*/
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuarterMeetingsComponent } from '.';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

const homeRoutes: Routes = [
  { path: 'home', component: QuarterMeetingsComponent}
];

@NgModule({
  imports: [
    CommonModule,FormsModule,
    RouterModule.forChild(homeRoutes)
  ],
  declarations: [
    QuarterMeetingsComponent
  ]
})
export class QuarterMeetingsModule { }
