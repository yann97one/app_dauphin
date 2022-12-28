import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaderResponse, HttpHeaders } from '@angular/common/http';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { networkInterfaces } from 'os';
import { CookieService } from 'ng2-cookies';
import { CapacitorCookies } from '@capacitor/core';
import { CapacitorCookiesPluginWeb } from '@capacitor/core/types/core-plugins';


export interface ERROR_T{
  code:number,
  string:string[]
}
export interface APILOGIN_IN{
  //{error:{code:'', string:[]}, locked?:'', use2fa?:'', forceChange?:''}
  login:string;
  password:string;
  key2fa? : String;
  newPassword? : String; 
}

export interface APILOGIN_OUT{
  //{error:{code:'', string:[]}, locked?:'', use2fa?:'', forceChange?:''}

  error : ERROR_T,
  locked?:number,
  use2fa?: number,
  forceChange?:number
}

export interface APIRECUP{
  project: string;
  id: number;
  createDate:Date;
  creatorId: number;
  creatorLabel:string;
  enabled:number;
  participant:string;
}

@Injectable({
  providedIn: 'root'
})

export class ApiService {
//"&use2fa="+auth
  constructor(private _http_o :HttpClient, private cookie:CookieService,) { }
   //url = "https://webapp.dauphintelecom-infrastructure.com/api";
   url = "http://webapp.dauphintelecom-infrastructure.local/api";
   urlrecup = "https://webapp.dauphintelecom-infrastructure.com/api/timemgnt/project?enabled=1";
 
  login(va_param_o:APILOGIN_IN, callback : Function){
    var vl_url_str: string;

    vl_url_str = this.url+"/auth?login=" +va_param_o.login + "&password=" + va_param_o.password
    if (va_param_o.key2fa != null) {
      vl_url_str += "&key2fa=" + va_param_o.key2fa;
    }

    if (va_param_o.newPassword != null) {
      vl_url_str = this.url+"/auth?login=" + decodeURIComponent(va_param_o.login.substring(1,va_param_o.login.length -1)) + "&password=" + decodeURIComponent(va_param_o.password.substring(1,va_param_o.password.length -1)) + "&newPassword=" + va_param_o.newPassword;
    }

    this._http_o.get<APILOGIN_OUT>(vl_url_str, { responseType:"json",observe:'response',withCredentials:true})
        .subscribe((va_response_o)=> {
            
            Cookie.set("test","valeurDeTest");
            console.log("Cookie.get(SADTI) :"+Cookie.get("SADTI"));
            console.log("Cookie avk le lien :"+Cookie.get("http://webapp.dauphintelecom-infrastructure.local/api"));
            console.log("Cookie avk le lien :"+Cookie.get("webapp.dauphintelecom-infrastructure.local/"));
            console.log(this.cookie.getAll());
           console.log(Cookie.getAll());
      
           console.log("this.getCookie :"+this.getCookie())
          callback(va_response_o.body);
            
        });

}

recup(va_param_r:APIRECUP, callback: Function){
  

  var project = va_param_r.project;
  var id = va_param_r.id;
  var createDate = va_param_r.createDate;
  var creatorId = va_param_r.creatorId;
  var creatorLabel = va_param_r.creatorLabel;
  var enabled = va_param_r.enabled;
  var participant = va_param_r.participant;


  this._http_o.get<APIRECUP>(this.urlrecup,{responseType:"json"}).subscribe((v_reponse)=>{
    callback(v_reponse);
  })
}


 getCookie = ()=>{
  return document.cookie;
}
  }


