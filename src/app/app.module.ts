import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { DatePickerModule } from 'ng2-datepicker';

import { AppComponent } from './app.component';
import { HomeModule } from './home/home.module';
import { RouterModule, Routes } from '@angular/router';
import { LoginModule } from './login/login.module';
import { DiscussionModule } from './discussion/discussion.module';
import { ActionModule } from './action/action.module';

const appRoutes: Routes = [
  { path: '', component:AppComponent }
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    HomeModule,
    LoginModule,
    DiscussionModule,
    ActionModule,
    DatePickerModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
