/*
  Login feature Module
*/
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from '.';

import { RouterModule, Routes } from '@angular/router';

const loginRoutes: Routes = [
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(loginRoutes)
  ],
  declarations: [
    LoginComponent
  ]
})
export class LoginModule {

}
