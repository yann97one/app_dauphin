import { Component, ElementRef, QueryList, Renderer2, ViewChild } from '@angular/core';
import { Navigate } from '../global-service.service';
import{ ApiService } from '../api.service';
import {Router, RouterModule} from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { Console } from 'console';
import { HttpRequestService } from '../http-request.service';
import { access } from 'fs';
import { addIcons } from 'ionicons';

//import {MatIconRegistry}
@Component({
  
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
 
  
})


export class Tab1Page {
  @ViewChild('pass') inputPass!: QueryList<ElementRef<HTMLInputElement>>;
  @ViewChild('img') img!: QueryList<ElementRef<HTMLImageElement>>;
  login!:String;
  pwd!:String;
  url! : String;
  err! : Error;
 public off = false;

  constructor(private api: ApiService ,private router:Router, private http:HttpRequestService, private renderer : Renderer2) {}

  
  onClick(){
    
   this.api.login(this.pwd,this.login);
  }



  go(){
    console.log("toto");
  }

 hidePass(): boolean{
  console.log(this.off.valueOf());
  
  this.off = ! this.off ;
  
  return this.off;
  
 }


}

