import {} from 'jasmine';
import { AuthenticationService } from './auth.service';
import { async, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
class MockRouter {
  navigateByUrl(url: string) { return url; }
}

describe('AuthenticationService TestBed', () => {
  let service: AuthenticationService;
  const mockData = {
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
    exp: 1493041118,
    userDetails: [{ firstName: 'Demo', lastName: 'User', isAdmin: false }]
  };
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthenticationService,
        { provide: Router, useClass: MockRouter }
      ]
    });
    service = TestBed.get(AuthenticationService);
  });

  it('should create an instance', () => {
    expect(service).toBeDefined();
  });
  it('should login', () => {
    expect(service.login(mockData)).toBeTruthy();
  });
  it('should check credentials', () => {
    expect(service.checkCredentials()).toBeTruthy();
  });
  it('should get userDetails', () => {
    expect(service.getUserdetails()).toEqual(mockData.userDetails[0]);
  });
  it('should get token', () => {
    expect(service.getToken()).toEqual(mockData.token);
  });
  it('should remove tokens', () => {
    service.logout();
    expect(localStorage.getItem("user")).toBeNull();
    expect(localStorage.getItem("token")).toBeNull();
  });
});
