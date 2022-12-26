import { Component, OnInit, Renderer2 } from '@angular/core';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { APILOGIN_IN, APILOGIN_OUT,ApiService } from '../api.service';
import { Router } from '@angular/router';
import { chdir } from 'process';

@Component({
  selector: 'app-change-mdp',
  templateUrl: './change-mdp.component.html',
  styleUrls: [
  './change-mdp.component.scss',
  '../app.component.scss'
],
})


export class ChangeMdpComponent implements OnInit {
  display2fa ! : string;
  auth2fa! : string;
  login! : string;
  new_pwd!: string;
  public display!: String;
  classAuth !: string;
  user_log = JSON.parse(localStorage.getItem('log') as string) ;
  user_pass = JSON.parse(localStorage.getItem('pass') as string) ;
  button! : boolean;
  
    
  
  constructor(private api: ApiService,private rend : Renderer2, private router : Router) { }


  /**
   * 
   * @param login correspond au login de l'utilisateur qui s'est authentifié en amont (voir la fonction onSubmit() sur tab1.page.ts)
   * @param pwd correspond au mot de passe de l'utilisateur qui s'est authentifié en amont (voir la fonction onSubmit() sur tab1.page.ts)
   * @function getItem()
   * Ici on utilise l'objet localStorage pour justement utiliser la session qui est initialisée lors de la connexion à l'application
   * (voir la fonction onSubmit() sur tab1.page.ts)
   */
  /*getItem(login : String, pwd : String){
    var pass = localStorage.getItem('pass');//on stocke les valeurs des variales de sessions dans les deux variables
    var log = localStorage.getItem('log');

    login = JSON.stringify(log);
    pwd = JSON.stringify(pass);
  }*/


  ngOnInit() {
    
  }

  callBackLogin(json: APILOGIN_OUT) {
    
    if(json.use2fa != undefined && json.use2fa ==1)
    {
      this.display2fa = "none";
      this.button=true
    }else{
      this.display2fa = "block";
      this.button=false;
    }
  }

  onSubmit(){
    var vl_param_o : APILOGIN_IN; 
    var vl_param_n : APILOGIN_OUT; 
    
    
    //var va_session : string;  
    vl_param_o = {  "login":  JSON.stringify(this.user_log),
                    "password": JSON.stringify(this.user_pass),
                    "newPassword": this.new_pwd};
                    
    if (this.display2fa!="none"){
      vl_param_o.key2fa = this.auth2fa;
      
    }
        this.api.login(vl_param_o,(va_json_o:APILOGIN_OUT)=>{this.callBackLogin(va_json_o)});  
  }

//this.api.login(vl_param_o,(va_json_o:APILOGIN_OUT)=>{this.callBackLogin(va_json_o)});


}



