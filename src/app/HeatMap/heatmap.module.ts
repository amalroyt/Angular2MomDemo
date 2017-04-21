/*
  Login feature Module
*/
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeatMapComponent } from '.';
import { FormsModule } from '@angular/forms';

import { RouterModule, Routes } from '@angular/router';

const meetingRoutes: Routes = [
  { path: 'heatmap', component: HeatMapComponent}
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(meetingRoutes)
  ],
  declarations: [
    HeatMapComponent
  ]
})
export class HeatMapModule { }
