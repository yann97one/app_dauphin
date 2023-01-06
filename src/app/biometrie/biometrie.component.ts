import { Component, OnInit } from '@angular/core';
import { APILOGIN_IN, APILOGIN_OUT } from '../api.service';
import { NativeBiometric } from "capacitor-native-biometric";
@Component({
  selector: 'app-biometrie',
  templateUrl: './biometrie.component.html',
  styleUrls: ['./biometrie.component.scss'],
})
export class BiometrieComponent implements OnInit {
  api: any;
  router: any;
 

  constructor() { }

  ngOnInit() {
    
  }

  // popUp(){
  //     this.faio.show({
  //       clientId: 'TEST',
  //       clientSecret: 'password'
  //     }).then((result:any)=>console.log(result))
  //     .catch((error:any)=> console.log(error));
  // }

  verifBio(){
    var vl_param_o : APILOGIN_IN;
    var login = localStorage.getItem("login");
    var pass = localStorage.getItem("pass");

    if(typeof login === 'string' && typeof pass === 'string'){
      
      NativeBiometric.setCredentials({
        username: login,
        password: pass,
        server: this.api.url+"/auth"
      }).catch(error =>{console.error(error)})

      NativeBiometric.verifyIdentity({
        reason: 'Pour tester',
        title: 'login',
      }).then(()=>{
        
        if(typeof login != "undefined" && typeof pass != "undefined"){
          vl_param_o = {"login": JSON.stringify(login),"password":JSON.stringify(pass)}
        }
        
        this.api.login(vl_param_o,(va_json_o: APILOGIN_OUT)=>{this.callBackLogin(va_json_o)});
      }).catch((err)=>{console.error(err)})
    }else{
      console.error('Vérifiez vos identifiants')
    }
  }

    callBackLogin(json:APILOGIN_OUT){
      // if(typeof json.use2fa != undefined && json.use2fa == 1)
      // {
      //   this.router.navigate(['/',''])
      //   return
      // }else{
        if(json.forceChange != undefined && json.forceChange ==1){
          this.router.navigate(['/','change_pass']);
          return
        }
      

      this.router.navigate(['/','main_menu']);
  }
  }
