import {} from 'jasmine';
import { MeetingListComponent } from '.';
import { Router } from '@angular/router';
import { inject, TestBed, getTestBed, async, fakeAsync, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import {BrowserDynamicTestingModule, platformBrowserDynamicTesting} from "@angular/platform-browser-dynamic/testing";
import { RouterTestingModule } from '@angular/router/testing';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, DebugElement } from '@angular/core';
import { Http, HttpModule,ConnectionBackend, BaseRequestOptions, Response, ResponseOptions, XHRBackend} from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { AuthenticationService } from '../services/auth.service';
import { SharedService } from '../services/sharedDetails.service';
//import { setBaseTestProviders } from '@angular/testing';
import { FormControl, FormGroup, FormBuilder, Validators, FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

describe('MeetingListComponent', () => {
  let component: MeetingListComponent;
  let fixture: ComponentFixture<MeetingListComponent>;
  let service: AuthenticationService;
  let router = {
  navigate: jasmine.createSpy('navigate')
}
  class MockRouter {
      navigateByUrl(url: string) { return url; }
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MeetingListComponent],
      imports: [ReactiveFormsModule, FormsModule, HttpModule],
      providers: [
        { provide: Router, useClass: MockRouter },
        { provide: Http, useClass: MockBackend },
        { provide: MeetingListComponent, useClass: MeetingListComponent },
        MockBackend , AuthenticationService,
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
        fixture = TestBed.createComponent(MeetingListComponent);
        component = fixture.componentInstance;
      });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeetingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

//   it('should check edit', (): void => {
//     fakeAsync(() => {
//         component.edit(1);
//         expect(component.edit(1)).toHaveBeenCalled();
//         expect(router.navigate).toHaveBeenCalledWith(['/meeting',1]);
//     });
// });
//
// it('should check openActionDiscussionForm', (): void => {
//   fakeAsync(() => {
//       component.openActionDiscussionForm(1);
//       expect(component.openActionDiscussionForm(1)).toHaveBeenCalled();
//       expect(router.navigate).toHaveBeenCalledWith(['/actionDiscussion',1]);
//   });
// });
//
// it('should check moreDetails', (): void => {
//   fakeAsync(() => {
//       component.moreDetails(1);
//       expect(component.moreDetails(1)).toHaveBeenCalled();
//       expect(router.navigate).toHaveBeenCalledWith(['/moreDetails',1]);
//   });
//});

// it('should check search false', (): void => {
//   component.search();
//   expect(component.search()).toBeFalsy();
// });
//
// it('should check search true', (): void => {
//   // var self = [{searchText:}];
//   component.search();
//   expect(component.search()).toBeFalsy();
// });

});
