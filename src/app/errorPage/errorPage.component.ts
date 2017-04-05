import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {Http} from '@angular/http';
import { Router} from '@angular/router';
import { contentHeaders } from '../common/headers';

@Component({
  selector: 'app-erroePage',
  templateUrl: './errorPage.component.html',
  styleUrls: ['./errorPage.component.css']
})
export class ErrorPageComponent implements OnInit {

  ngOnInit() {

  }
}
