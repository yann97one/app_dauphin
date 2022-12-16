import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


export interface ERROR_T{
  code:number,
  string:string[]
}
export interface APILOGIN_T{
  //{error:{code:'', string:[]}, locked?:'', use2fa?:'', forceChange?:''}

  error : ERROR_T,
  locked:number,
  use2fa?: number,
  forcedChange? : number
}

@Injectable({
  providedIn: 'root'
})

export class ApiService {
//"&use2fa="+auth
  constructor(private _http_o :HttpClient) { }
   url = "https://webapp.dauphintelecom-infrastructure.com/api";
  login(mdp:String, username:String, callback : Function, auth? : String){
    this._http_o.get<APILOGIN_T>(this.url+"/auth?password=" + mdp +"&login="+ username,{ responseType:"json"})
        .subscribe((va_response_o)=> {

          callback(va_response_o);
            
        });
        if(typeof auth != "undefined"){
          this._http_o.get<APILOGIN_T>(this.url+"/auth?password=" + mdp +"&login="+ username+ "&key2fa="+auth ,{ responseType:"json"})
          .subscribe((va_response_o)=> {
  
            callback(va_response_o);
              
          });
        }
        

}
  }


