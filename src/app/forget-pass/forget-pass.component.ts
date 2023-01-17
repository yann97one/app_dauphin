import { Component, OnInit } from '@angular/core';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {Router, RouterModule} from '@angular/router';

@Component({
  selector: 'app-forget-pass',
  templateUrl: './forget-pass.component.html',
  styleUrls: ['./forget-pass.component.scss'],
  
})
export class ForgetPassComponent implements OnInit {

  constructor(private router:Router) { }
  url! : String
  public routerLink = "/login";
  
go(){
  console.log("toto");
}
  ngOnInit() {}
}
