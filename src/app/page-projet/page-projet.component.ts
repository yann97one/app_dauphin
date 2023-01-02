import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import {  APIRECUP, ApiService } from '../api.service';

@Component({
  selector: 'app-page-projet',
  templateUrl: './page-projet.component.html',
  styleUrls: ['../app.component.scss','./page-projet.component.scss'],
})
export class PageProjetComponent implements OnInit,AfterViewInit{
  date! : string;
  comment! : string;
  select! : string;
  heure! : number;
  IsDisabled! : boolean;
  name!:string | any;
  recup! : APIRECUP;

  login!:string | any;
pwd!:string| any;
A2F!:string| any;
  constructor(private api : ApiService, private http: HttpClient) { }

  ngAfterViewInit(): void {
    var vl_param_i : APIRECUP;
   

    
    
   
    vl_param_i = {
      "project": this.api.session_str,
      "id": this.api.idSession
    }
    
    this.api.recup(vl_param_i,(va_json_re : APIRECUP)=>{this.callBackRecup(va_json_re)});
  }
callBackRecup(va_json_re:APIRECUP){
  if(typeof this.login != "undefined")
  {
    
  }
}

 


  ngOnInit() {}
 submit(){

 }

}
