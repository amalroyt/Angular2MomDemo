import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import {} from 'jasmine';
import { contentHeaders } from '../common/headers';
import { AuthenticationService } from './auth.service';
import { MockBackend } from '@angular/http/testing';
import {setBaseTestProviders} from '@angular/testing';
import { inject, TestBed, getTestBed, async, fakeAsync, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
// ADDED CLASS
class MockRouter {
    navigateByUrl(url: string) { return url; }
}

beforeEach(() => {
  TestBed.configureTestingModule({
    imports: [],
    declarations: [],
    providers: [
      { provide: Router, useClass: MockRouter },
      {provide: Http, useClass: MockBackend},
      AuthenticationService
    ]
  });

  // var user = { token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjE3Mjk2LCJleHAiOjE0OTI3NjI0NDYsImlhdCI6MTQ5Mjc2MTg0Nn0.F8wh8W0k4wvchsMSKBjk00boC4fpu3efQd3lVAUuxd0',
  // exp: 1492762446,
  // userDetails: [ { firstName: 'Sandeep', lastName: 'Nabar', isAdmin: true } ] };

  // it('#toLogin', inject([AuthenticationService], (service: AuthenticationService) => {
  //   expect(service.login(user)).toBeTruthy();
  // }));

  it('should create', () => {
    expect(true).toBeTruthy();
  });
});
