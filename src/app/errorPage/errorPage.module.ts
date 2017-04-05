import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ErrorPageComponent } from '.';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const errorPageRoutes: Routes = [
  { path: 'errorPage', component: ErrorPageComponent }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(errorPageRoutes)
  ],
  declarations: [

    ErrorPageComponent
  ]

})
export class ErrorPageModule { }
