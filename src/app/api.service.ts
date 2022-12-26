import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


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

@Injectable({
  providedIn: 'root'
})

export class ApiService {
//"&use2fa="+auth
  constructor(private _http_o :HttpClient) { }
   url = "https://webapp.dauphintelecom-infrastructure.com/api";
  login(va_param_o:APILOGIN_IN, callback : Function){
    var vl_url_str;

    vl_url_str = this.url+"/auth?login=" +va_param_o.login + "&password=" + va_param_o.password
    if (va_param_o.key2fa != null) {
      vl_url_str += "&key2fa=" + va_param_o.key2fa;
    }

    if (va_param_o.newPassword != null) {
      vl_url_str = this.url+"/auth?login=" + decodeURIComponent(va_param_o.login.substring(1,va_param_o.login.length -1)) + "&password=" + decodeURIComponent(va_param_o.password.substring(1,va_param_o.password.length -1)) + "&newPassword=" + va_param_o.newPassword;
    }

    this._http_o.get<APILOGIN_OUT>(vl_url_str, { responseType:"json"})
        .subscribe((va_response_o)=> {
            
          callback(va_response_o);
            
        });

}
  }


