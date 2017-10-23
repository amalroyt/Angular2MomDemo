import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateUserComponent } from '.';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

const createUserRoutes: Routes = [
  { path: 'createUser', component: CreateUserComponent}
];

@NgModule({
  imports: [
    CommonModule,ReactiveFormsModule,
    RouterModule.forChild(createUserRoutes)
  ],
  declarations: [
    CreateUserComponent
  ]
})
export class CreateUserModule { }
