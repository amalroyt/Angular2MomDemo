import {} from 'jasmine';
import { ActionDiscussionComponent } from './actionDiscussion.component';
import {  async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, DebugElement } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {Http} from '@angular/http';
import { AuthenticationService } from '../services/auth.service';

class mockSharedDetailsActionDiscussion {
  navigateByUrl(url: string) { return url; }
}

describe('ActionDiscussionComponent', () => {
  let component: ActionDiscussionComponent;
  let fixture: ComponentFixture<ActionDiscussionComponent>;
  const mockData = {
    meetingId : 1
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        ActionDiscussionComponent,
        { provide: Router, useClass: mockSharedDetailsActionDiscussion },
        { provide: Http, useClass: mockSharedDetailsActionDiscussion },
        { provide: ActivatedRoute, useClass: mockSharedDetailsActionDiscussion },
        { provide: AuthenticationService, useClass: mockSharedDetailsActionDiscussion }
      ],
      imports: [ FormsModule ],
      declarations: [ ActionDiscussionComponent ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionDiscussionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
