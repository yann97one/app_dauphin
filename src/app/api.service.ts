import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaderResponse, HttpHeaders } from '@angular/common/http';
import { Cookie, CookieService } from 'ng2-cookies';
import { callbackify } from 'util';


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
  session?:string
  idSession?:string;
}

export interface APIRECUP{
  project: string | any,
  id: string | any,
  createDate?:Date,
  creatorId?: number,
  creatorLabel?:string,
  enabled?:number,
  participant?:string,
  projectLabel?: string
  //{"error":{"code":200,"string":["Success"]},"projects":[{"id":"3","createDate":"21\/12\/2022","creatorId":"119",
  //"creatorLabel":"SEPULCRE Patrice","label":"tretrtrtret","enabled":"1","charging":"60",
  //"participants":[{"id":"119","type":"0"},{"id":"4317","type":"0"}]},{"id":"2","createDate":"19\/12\/2022",
  //"creatorId":"119","creatorLabel":"SEPULCRE Patrice","label":"Application Mobile Gestion de projet","enabled":"1","charging":"172","participants":[{"id":"119","type":"0"},{"id":"1","type":"1"},{"id":"4317","type":"0"}]}]}
}

export interface APILOGED{
  error? : ERROR_T,
  code ?: number,
  session : string,
  id : string;
  lastname? : string;
  firstname ? : string;
  parentId? : string;

}

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  public session_str : string | null;
  public idSession : string |null;
//"&use2fa="+auth
  constructor(private _http_o :HttpClient, private cookie:CookieService) { 

    this.session_str = null;
    this.idSession = null;
  }

   url = "https://webapp.dauphintelecom-infrastructure.com/api";
    //url = "http://webapp.dauphintelecom-infrastructure.local/api";
     //url = "http://localhost:8100/api";
   
    reponse : any;
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
          
            
          /*const response =  await Http.get({
            url: 'http://webapp.dauphintelecom-infrastructure.local/api/'+vl_url_str,
            webFetchExtra: {
              credentials: 'include'
            }
          });
            console.log("datiCookie :"+sadtiCookie);
            Cookie.set("test","valeurDeTest");
            console.log(response.headers);
            console.log("Cookie.get(SADTI) :"+Cookie.get("SADTI"));
            console.log("Cookie avk le lien :"+Cookie.get("http://webapp.dauphintelecom-infrastructure.local/api"));
            console.log("Cookie avk le lien :"+Cookie.get("http://webapp.dauphintelecom-infrastructure.local"));
            console.log(this.cookie.getAll());
            console.log(Cookie.getAll());
            console.log(this.litCookie("test"));
            console.log("this.getCookie :"+this.getCookie("test"));*/
            //Cookie.set("SADTI","g36isepucnfaci0e98o22b9fmi");
           
              
             
            
          callback(va_response_o.body)
            
        });

    

}
  

 
 /*envoiCookie(va_param_o:APILOGED){
    if(va_param_o.session!= null || va_param_o.session!= undefined){
      Cookie.set("session",va_param_o.session);
    }else{
      console.log("Il n'existe pas");
    }
 }*/

recup(va_param_r:APIRECUP,callback:Function){

 
  /*var project = va_param_r.project;
  var id = va_param_r.id;
  var createDate = va_param_r.createDate;
  var creatorId = va_param_r.creatorId;
  var creatorLabel = va_param_r.creatorLabel;
  var enabled = va_param_r.enabled;
  var participant = va_param_r.participant;*/
  

  /*this._http_o.get<APIRECUP>(this.urlrecup,{responseType:"json"}).subscribe((v_reponse)=>{
    callback(v_reponse);
  })*/
 
  
  /*this._http_o.get<APIRECUP>(this.urlrecup,{responseType:"json"}).subscribe( v_reponse  =>{
      this.reponse = v_reponse;
      callback(this.reponse.body)
   })*/
  
   const headers = new HttpHeaders("Cookie: SADTI="+this.session_str);
   //headers.append('Cookie','SADTI='+this.session_str);
   console.log(headers);
   this._http_o.get(this.url + "/timemgnt/project?enabled=1",{/*"headers":headers,*/ withCredentials:true}).subscribe((va_reponse_o)=>{
    callback(va_reponse_o)
   });
}



}

