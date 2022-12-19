import { Component, OnInit, Renderer2 } from '@angular/core';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { APILOGIN_IN, APILOGIN_OUT,ApiService } from '../api.service';
@Component({
  selector: 'app-change-mdp',
  templateUrl: './change-mdp.component.html',
  styleUrls: ['./change-mdp.component.scss'],
})


export class ChangeMdpComponent implements OnInit {
  protected display2fa ! : string;
  auth2fa! : string;
  login!: string;
  new_pwd!: string;
  public display!: String;
  
  constructor(private api: ApiService,private rend : Renderer2) { }


  OnClick(){
    var vl_param_o : APILOGIN_IN;

    vl_param_o = {  "login":this.login,
                    "password": this.new_pwd};
                    if (this.display2fa!="none") {
                      vl_param_o.key2fa = this.auth2fa;
                    }
                
                    if (this.display2fa!="none") {
                      vl_param_o.key2fa = this.auth2fa;
                    }
                
                    if(this.display != "none")
                          this.api.login(vl_param_o,(va_json_o:APILOGIN_OUT)=>{this.callBackLogin(va_json_o)});
  }


  ngOnInit() {}

  callBackLogin(json: APILOGIN_OUT) {
    
    if(json.use2fa != undefined && json.use2fa ==1)
    {
      
      this.display2fa = "block"
    }else{
      this.display2fa = "none"
    }






  }
 
}
