import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Toast } from '@capacitor/toast';
import { NativeBiometric } from "capacitor-native-biometric";
import { APILOGIN_IN, APILOGIN_OUT, ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class BioLoginService {

  constructor(private router: Router, private api: ApiService) { }


  verif2fa!:boolean;
  
  async biomVerif(login: string, pass: string) {
    var vl_param_o = {
      "login": login,
      "password": pass,
    }
    await NativeBiometric.getCredentials({//On récupère les info d'auth de l'utilisateur
      server: "webapp.dauphintelecom-infrastructure.com",
    }).then(async () => {
      //si la récupération à bien été effectuéeon se connecte avec l'api
      console.log("Native :"+JSON.stringify( await NativeBiometric.getCredentials({server: "webapp.dauphintelecom-infrastructure.com"})))
      this.api.login(vl_param_o, (va_json_o: APILOGIN_OUT) => { this.callBackLogin(va_json_o) })
      
    }).catch((err) => {
      console.error("Erreur d'auth :", err);
      this.router.navigate(['/', 'login'])
    })

      /**
       * await NativeBiometric.setCredentials({
        username: login, password: pass, server: "https://webapp.dauphintelecom-infrastructure.com/"
      }).then(async () => {
        console.log("Enregistrement reussi")

      }).catch((err) => console.error("Erreur lors de l'enregistrement" + err))
       */


  }

  async callBackLogin(json: APILOGIN_OUT) {
    var vl_param_o:APILOGIN_IN;
    if (json.forceChange != undefined && json.forceChange == 1) {
      this.router.navigate(['/', 'change_pass']);
    } else if (json.use2fa != undefined && json.use2fa == 1) {
      
      await Toast.show({
        text:"Auth A 2 Facteurs",
        duration: "long",
        position:"top"
      })
      console.log("USE2FA")
      
      vl_param_o={
        "login":"yannis.sileber",
        "password":"TestDeLaMort1234@",
        "key2fa":""
      }
    }
  }
}
