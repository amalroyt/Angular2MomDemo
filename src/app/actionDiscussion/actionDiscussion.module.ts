import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActionDiscussionComponent } from '.';

import { RouterModule, Routes } from '@angular/router';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';



const actionDiscussionRoutes: Routes = [
  { path: 'actionDiscussion', component: ActionDiscussionComponent }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(actionDiscussionRoutes)
  ],
  declarations: [

    ActionDiscussionComponent
  ]

})
export class ActionDiscussionModule { }
