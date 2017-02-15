import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DiscussionComponent } from '.';

import { RouterModule, Routes } from '@angular/router';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';



const discussionRoutes: Routes = [
  { path: 'discussion', component: DiscussionComponent }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(discussionRoutes)
  ],
  declarations: [

    DiscussionComponent
  ]

})
export class DiscussionModule { }
