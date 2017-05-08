import {} from 'jasmine';
import { LoginComponent } from './login.component';
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
import { setBaseTestProviders } from '@angular/testing';
import { FormControl, FormGroup, FormBuilder, Validators, FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

// ADDED CLASS
class MockRouter {
    navigateByUrl(url: string) { return url; }
}
class MockAuthenticationService extends AuthenticationService {
   public mockName: string = 'Mocked Service';
  // public sayHello(): string {
  //   return this.mockName;
  // }
    // public login(user):boolean {
    //
    // }
}
class MockSharedService extends SharedService {
   public mockName: string = 'Mocked Service';
  public sayHello(): string {
    return this.mockName;
  }
}

const mockResponse = {
  exp: 1493715256,
  token: 12234,
  userDetails:[{firstName: "Demo",lastName: "User", userId: 1, isAdmin: false}]
};

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let service: AuthenticationService;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [ReactiveFormsModule, FormsModule, HttpModule],
      providers: [
        { provide: Router, useClass: MockRouter },
        { provide: Http, useClass: MockBackend },
        { provide: LoginComponent, useClass: LoginComponent },
        MockBackend , AuthenticationService,
        // {
        //   provide: Http, useFactory: (backend: ConnectionBackend, defaultOptions: BaseRequestOptions) => {
        //     return new Http(backend, defaultOptions);
        //   }, deps: [MockBackend, BaseRequestOptions]
        // },
        { provide: AuthenticationService, useClass: MockAuthenticationService },
        { provide: SharedService, useClass: MockSharedService }
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(LoginComponent);
        component = fixture.componentInstance;
      });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  // it('should fafafa create', () => {
  //   expect(true).toBeTruthy();
  // });

  it('should authorize the user',
   inject([LoginComponent, MockBackend], fakeAsync((loginComponent: LoginComponent, mockBackend: MockBackend) => {
     let res;
     mockBackend.connections.subscribe(c => {
       expect(c.request.url).toBe('http://localhost:8081/login');
       let response = new ResponseOptions({body: '[{ token: eyJhbGciO, exp: 1493271149, userDetails: [ { firstName: Demo, lastName: User, isAdmin: true } ] }]'});
       c.mockRespond(new Response(response));
     });
    }))
  );

  // it('should get search results', fakeAsync(
  //   inject([
  //     XHRBackend,
  //     LoginComponent
  //   ], (mockBackend: XHRBackend, loginComponent: LoginComponent) => {
  //
  //     const expectedUrl = 'https://en.wikipedia.org/w/api.php?' +
  //       'action=query&list=search&srsearch=Angular';
  //
  //     mockBackend.connections.subscribe(
  //       (connection: MockConnection) => {
  //         expect(connection.request.method).toBe(RequestMethod.Post);
  //         expect(connection.request.url).toBe(expectedUrl);
  //
  //         connection.mockRespond(new Response(
  //           new ResponseOptions({ body: mockResponse })
  //         ));
  //       });
  //
  //     loginComponent.onSubmit()
  //       .subscribe(res => {
  //         expect(res).toEqual(mockResponse);
  //       });
  //   })
  // ));

  it('should check toVerify', inject([AuthenticationService], (mockService: AuthenticationService) => {

    // /expect(mockResponse.data[0].token).toBeTruthy();
    // console.log(mockResponse.data[0].token);
    // expect(mockService.login(mockResponse.data[0])).toBeTruthy();
  }));

});
