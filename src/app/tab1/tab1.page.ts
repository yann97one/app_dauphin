import { Component, ElementRef, EventEmitter, Output, QueryList, Renderer2, ViewChild } from '@angular/core';
import{ ApiService } from '../api.service';
import {Router, RouterModule} from '@angular/router';
import { HttpRequestService } from '../http-request.service';


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
  type! : String; // Variable permettant de gérer le type d'input de mdp
  public url = "assets/icon/on.png";
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
  if(this.off == true){
    this.url="assets/icon/on.png";
  }else{
    this.url="assets/icon/off.png";
  }
  return this.off;
  
 }

 getClass(): String{
  if(this.url === "assets/icon/on.png"){
    this.type = "text";
  }else{
    this.type = "password";
  }
  return this.type;
 }


}

