/*
  Login feature Module
*/
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from '.';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

const loginRoutes: Routes = [
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [
    CommonModule,ReactiveFormsModule,
    RouterModule.forChild(loginRoutes)
  ],
  declarations: [
    LoginComponent
  ]
})
export class LoginModule {

}
