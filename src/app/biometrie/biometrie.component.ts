import { AfterViewInit, Component, OnInit } from '@angular/core';
import { APILOGIN_IN, APILOGIN_OUT, ApiService } from '../api.service';
import { NativeBiometric, NativeBiometricPlugin } from "capacitor-native-biometric";
import { Router } from '@angular/router';
import { isPlatform } from '@ionic/angular';
import { BioLoginService } from '../bio-login.service';
import { userInfo } from 'os';
import { Toast } from '@capacitor/toast';



@Component({
  selector: 'app-biometrie',
  templateUrl: './biometrie.component.html',
  styleUrls: ['./biometrie.component.scss'],
})
export class BiometrieComponent implements OnInit, AfterViewInit {


  display!: boolean
  auth!:boolean;
  constructor(private router: Router, private biom: BioLoginService, private api: ApiService) { }

  async ngAfterViewInit(): Promise<void> {
    var va_param_o: APILOGIN_IN;
    if(await NativeBiometric.isAvailable()){
      if (isPlatform("android")) { //vérifie si l'utilisateur utilise un appareil android
        await NativeBiometric.verifyIdentity({
          title: 'S\'authentifier',
        })
        .then(async () => {
           await NativeBiometric.getCredentials({ server: "webapp" }).then((response) => {
            va_param_o={
              "login":response.username,
              "password":response.password
            }
  
            this.api.login(va_param_o,(va_json_o:APILOGIN_OUT)=> this.callBackLogin(va_json_o))
          })
        }).catch((err) => {
          this.router.navigate(['/', 'login'])
          Toast.show({
            "text": "Erreur d'authentification",
            "duration":"long",
            "position":'bottom'
          })
          
          console.error(err)
        })
    }else{this.router.navigate(['/','login'])}
    
      // get credential
      // api login
      // si 2FA => affiche 2fa (display)
      // si OK page principale




      // await this.verifIsAvailable()//fonction qui vérifie si l'auth biométrique par empreinte est dispo
      //   .then(() => {
      //     console.log("entré")
      //     //Boite de dialogue pour l'auth biométrique
      //     NativeBiometric.verifyIdentity({
      //       reason: 'test',
      //       title: 'S\'authentifier',
      //       description: 'test'
      //     }).catch(async (err) => {
      //       console.error(err); 
      //       await Toast.show({
      //         text: 'Erreur d\'authentification',
      //         duration: 'long',
      //         position: 'top'
      //       })

      //     })
      //       if(this.login && this.pwd != null)
      //         this.biom.biomVerif(this.login,this.pwd)
      //   })
      /**
       * @var login correspond à l'id de l'utilisteur 
       */
      /*.then(()=>{
        console.log("localstorage :"+this.login)
        if(this.login != null && this.pwd != null)
          this.biom.biomVerif(this.login,this.pwd)
      })
      .catch((err)=>{
        console.error(err)
      })*/



    }

    /*if(isPlatform("android")){
      const test = this.verifIsAvailable()
      console.log(test)
     }else if(await test == true){
      console.log("test verif")
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
     }*/


  }

  //On appelle cette fonctin que si l'A2principaleF est activée
   /*onValid2FA() {
    console.log("onValid2FA")
     NativeBiometric.getCredentials({server:"webapp"}).then((response)=>{
      var vl_param_o:APILOGIN_IN;
      

      console.log(response.username +" ",response.password)
      vl_param_o={
        "login": response.username,
        "password":response.password,
        "key2fa":this.loginAuth2fa()
      }

     

      this.api.login(vl_param_o,(va_json_o:APILOGIN_OUT)=>this.callBackLogin(va_json_o))
    
    }).catch((err)=>{
      console.error("Erreur d'auth2fa :  "+err)
    })

    
    // login API + 2fa
    // OK => page principale
    // erreur => traite l'erreur ex chgt mdp
  }*/

  ngOnInit() {

  }
  /**
   * 
   * @returns Cette fonction retourne true si le lecteur d'empreinte est disponible sur l'appareil de l'utilisateur,
   *@constant dispo c'est la constante qui permet de vérifier si le lecteur d'empreinte est disponible
   */
  async verifIsAvailable(): Promise<boolean | undefined> {
    const dispo = await NativeBiometric.isAvailable()

    try {
      if (dispo) {
        console.log("VALIDE")
        return true
      }
    } catch (e) {
      console.error(e)
      return false
    }
    return
  }

  




  handleRefresh(event: any) {
    setTimeout(() => {
      // Any calls to load data go here
      window.location.reload();
      event.target.complete();
    }, 2000);
  };
  loginAuth2fa(authfa='') {
    console.log(authfa)
    this.verifBio(authfa);
    return authfa
  }

  async verifBio(event:string) {
    var input: APILOGIN_IN;

     await NativeBiometric.getCredentials({ server: "webapp" })
     .then((response) => {
        input = {
          "login": response.username,
          "password": response.password,
        }
         input.key2fa=event;
         this.api.login(input, (va_json_o: APILOGIN_OUT) => { this.callBackLogin(va_json_o) })
        return
      })
      .catch((err) => {
        console.error("Erreur d'auth :  " + err)
        
        this.router.navigate(['/', 'login']);
      })
    
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
    this.router.navigate(['/', 'login']);
    console.log("Entrez vos id dans la conn")
  }*/



   callBackLogin(json: APILOGIN_OUT) {
    
    
    if (json.use2fa != undefined && json.use2fa == 1) {
      this.auth=true;
      this.display=true;
       Toast.show({
        text: "Auth A 2 Facteurs",
        duration: "short",
        position: "bottom"
      })
      
 
      return
    } else {
      if (json.forceChange != undefined && json.forceChange == 1) {
        this.router.navigate(['/', 'change_pass']);
        return
        
      }
      if(json.error.code!=200){
        Toast.show({
          "text":"Erreur d'authentification",
          "duration":"long",
          "position":"center"
        })
        return
      }

      


      this.router.navigate(['/', 'main_menu']);
    }
  }

 


  
}
