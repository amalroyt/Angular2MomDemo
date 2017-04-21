import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { D3GroupBarChartComponent } from '.';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const d3GroupBarChartRoutes: Routes = [
  { path: 'd3GroupBarChart', component: D3GroupBarChartComponent }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(d3GroupBarChartRoutes)
  ],
  declarations: [

    D3GroupBarChartComponent
  ]

})
export class D3GroupBarChartModule { }
