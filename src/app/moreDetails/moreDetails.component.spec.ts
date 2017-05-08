import {} from 'jasmine';
import { MoreDetailsComponent } from '.';
import { Router } from '@angular/router';
import { inject, TestBed, getTestBed, async, fakeAsync, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import {BrowserDynamicTestingModule, platformBrowserDynamicTesting} from "@angular/platform-browser-dynamic/testing";
import { RouterTestingModule } from '@angular/router/testing';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, DebugElement } from '@angular/core';
import { Http, HttpModule,ConnectionBackend, BaseRequestOptions, Response, ResponseOptions, XHRBackend} from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { setBaseTestProviders } from '@angular/testing';
import { FormControl, FormGroup, FormBuilder, Validators, FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

describe('MoreDetailsComponent', () => {
  let component: MoreDetailsComponent;
  let fixture: ComponentFixture<MoreDetailsComponent>;
  let router = {
  navigate: jasmine.createSpy('navigate')
}
  class MockRouter {
      navigateByUrl(url: string) { return url; }
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MoreDetailsComponent],
      imports: [ReactiveFormsModule, FormsModule, HttpModule],
      providers: [
        { provide: Router, useClass: MockRouter },
        { provide: Http, useClass: MockBackend },
        { provide: MoreDetailsComponent, useClass: MoreDetailsComponent },
        MockBackend ,
        BaseRequestOptions ,
        { provide: Http,
          deps: [ MockBackend, BaseRequestOptions ],
          useFactory: (backend: MockBackend, options: BaseRequestOptions) => {
            return new Http(backend, options);
          }
        }
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(MoreDetailsComponent);
        component = fixture.componentInstance;
      });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoreDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should check search true', (): void => {
  //   // var self = [{searchText:}];
  //
  // });


});
