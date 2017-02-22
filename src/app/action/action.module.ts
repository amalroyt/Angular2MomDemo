import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActionComponent } from '.';

import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const actionRoutes: Routes = [
  { path: 'action', component: ActionComponent }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(actionRoutes)
  ],
  declarations: [
    ActionComponent
  ]
})
export class ActionModule { }
