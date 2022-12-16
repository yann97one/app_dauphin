import { Component, ElementRef, EventEmitter, Output, QueryList, Renderer2, ViewChild } from '@angular/core';
import { APILOGIN_T, ApiService } from '../api.service';
import { Router, RouterModule } from '@angular/router';
import { HttpRequestService } from '../http-request.service';


//import {MatIconRegistry}
@Component({

  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],


})


export class Tab1Page {
 
  login!: String;
  pwd!: String;
  auth! : String;
  type!: String; // Variable permettant de gérer le type d'input de mdp
  public url = "assets/icon/on.png";
  public off = false;
  public display!: String;
  protected display2fa : string;
   
  constructor(private api: ApiService,private rend : Renderer2) { 

    this.display2fa = "none";
  }


  onClick() {
    if(this.display != "none")
      this.api.login(this.pwd, this.login,(va_json_o:APILOGIN_T)=>{this.callBackLogin(va_json_o)},this.auth);
  }



  callBackLogin(json: APILOGIN_T) {
    
    if(json.use2fa != undefined && json.use2fa ==1)
    {
      
      this.display2fa = "block"
    }else{
      this.display2fa = "none"
    }






  }
  go() {
    console.log("mdp : dAn1oCLV \n login: yannis.sileber");
    
  }
  
  hidePass(): boolean {
    console.log(this.off.valueOf());

    this.off = !this.off;
    if (this.off == true) {
      this.url = "assets/icon/on.png";
    } else {
      this.url = "assets/icon/off.png";
    }
    return this.off;

  }

  getClass(): String {
    if (this.url === "assets/icon/on.png") {
      this.type = "text";
    } else {
      this.type = "password";
    }
    return this.type;
  }


}

