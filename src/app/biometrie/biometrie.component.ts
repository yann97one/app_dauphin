import { AfterViewInit, Component, OnInit } from '@angular/core';
import { APILOGIN_IN, APILOGIN_OUT } from '../api.service';
import { NativeBiometric } from "capacitor-native-biometric";
import { Router } from '@angular/router';
import { Toast } from '@capacitor/toast';

@Component({
  selector: 'app-biometrie',
  templateUrl: './biometrie.component.html',
  styleUrls: ['./biometrie.component.scss'],
})
export class BiometrieComponent implements OnInit, AfterViewInit {
  api: any;



  constructor(private router: Router) { }

  ngAfterViewInit(): void {
    NativeBiometric.verifyIdentity({
      reason: 'Pour tester',
      title: 'S\'authentifier',
    }).then(() => {
      this.verifBio();
    }).catch((err) => {

      console.error(err)

      switch (err) {
        case "0":
          this.presentToast("Erreur  biométrique");
          window.location.reload();
          break;

        case "10":
          this.presentToast("Erreur d'authentification");
          window.location.reload();
          break;

        case "12":
          this.presentToast("Contexte invalide");
          window.location.reload();
          break;
        default:
          this.presentToast("Veuillez réessayer");
          window.location.reload();
      }
    })
   
  }
  ngOnInit() {

  }

   async presentToast(message:string) {
    await Toast.show({
      text : message,
      position: 'top',
      duration:'long'
    })
  }

  handleRefresh(event: any) {
    setTimeout(() => {
      // Any calls to load data go here
      window.location.reload();
      event.target.complete();
    }, 2000);
  };
  
   verifBio() {
    var vl_param_o: APILOGIN_IN;
    var login = localStorage.getItem("login");
    var pass = localStorage.getItem("pass");
    const infoUser = async()=> await NativeBiometric.getCredentials({server: "https://webapp.dauphintelecom-infrastructure.com/"})
    .then(()=>{

    })
    .catch((err)=>{
        console.error(err)
        this.router.navigate(['/','Tab1Page']);
    })
    infoUser();
    }
    /*if (login != null && pass != null) {
      if (typeof login != "undefined" && typeof pass != "undefined") {

        NativeBiometric.setCredentials({
          username: login,
          password: pass,
          server: this.api.url + "/auth"
        }).catch(error => { console.error(error) })

        NativeBiometric.verifyIdentity({
          reason: 'Pour tester',
          title: 'login',
        }).then(() => {

          if (typeof login != "undefined" && typeof pass != "undefined") {
            vl_param_o = { "login": JSON.stringify(login), "password": JSON.stringify(pass) }
          }

          this.api.login(vl_param_o, (va_json_o: APILOGIN_OUT) => { this.callBackLogin(va_json_o) });
        }).catch((err) => { console.error(err) })
      } else {
        console.error('Vérifiez vos identifiants')
      }
    } else {
      this.router.navigate(['/', 'Tab1Page']);
      console.log("Entrez vos id dans la conn")
    }*/

  

  callBackLogin(json: APILOGIN_OUT) {
    // if(typeof json.use2fa != undefined && json.use2fa == 1)
    // {
    //   this.router.navigate(['/',''])
    //   return
    // }else{
    if (json.forceChange != undefined && json.forceChange == 1) {
      this.router.navigate(['/', 'change_pass']);
      return
    }


    this.router.navigate(['/', 'main_menu']);
  }
}

