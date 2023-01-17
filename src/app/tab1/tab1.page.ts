import { Component, EventEmitter, Input, Output } from '@angular/core';
import { APILOGIN_IN, APILOGIN_OUT, ApiService } from '../api.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Cookie } from 'ng2-cookies';
import { NativeBiometric } from 'capacitor-native-biometric';
import { Toast } from '@capacitor/toast';

//import {MatIconRegistry}
@Component({

  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],


})



//Classe du component de la page de connexion
export class Tab1Page {
  ngOnInit() {


  }
  @Output() sendAuth = new EventEmitter()
  login!: string; //var qui enregistre l'entrée Login de l'utilisateur dans le formulaire
  pwd!: string; //var qui enregistre l'entrée mdp de l'utilisateur dans le formulaire
  auth2fa!: string;//var qui enregistre l'entrée d'A2F de l'utilisateur dans le formulaire
  type!: string; // Variable permettant de gérer le type d'input de mdp
  public url = "assets/icon/on.png";
  public off = true;
  forcedChange!: string;
  public display2fa: string;
  button!: boolean
  constructor(private api: ApiService, private router: Router, private http: HttpClient) {

    this.display2fa = "none";
  }



  /*
  Fonction qui vérifie l'entrée de l'utilisateur et si elles sont valides renvoie
  vers la fonction callBackLogin()
  */
  onClick() {
    var vl_param_o: APILOGIN_IN;
   
    vl_param_o = {
      "login": this.login,
      "password": this.pwd
    };
    
    
    
    this.checkIfExist(this.login, this.pwd);
    this.api.login(vl_param_o, (va_json_o: APILOGIN_OUT) => { this.callBackLogin(va_json_o) });
    console.log(vl_param_o)
  }

  async checkIfExist(login: string, pwd: string) {
   
      await NativeBiometric.getCredentials({
        server: "webapp"
      }).catch((err) => {
        console.error(err);
        NativeBiometric.setCredentials({
          username: login,
          password: pwd,
          server: "webapp"
        })
      })  
    
   
  }

  handleRefresh(event: any) {
    setTimeout(() => {
      // Any calls to load data go here
      window.location.reload();
      event.target.complete();
    }, 2000);
  };

  onSubmit(authfa:string){
     var vl_param_o : APILOGIN_IN; 
     var vl_param_n : APILOGIN_OUT; 
    
      
     vl_param_o = {  "login":    this.login,
                     "password": this.pwd};
     if (this.button==true) {
       vl_param_o.key2fa = authfa;
       
     }
 
    
 
      vl_param_n = {"forceChange": 0,
                    "error": {"code":0, "string": [""]}};
       if(vl_param_n.forceChange != null && vl_param_n.forceChange == 1){
           this.router.navigate(['/','change_pass'])
           return
       }else{
         this.api.login(vl_param_o,(va_json_o:APILOGIN_OUT)=>{this.callBackLogin(va_json_o)});
         
       }    
 
       
       
   }



  /**
   * @param json Variable qui hérite de l'interface APILOGIN_OUT
   * Cette fonction sert à gérer l'affichage de la partie A2F 
   * elle ne l'affiche qu'a condition que la @var use2fa soit différent de null
   * @var button correspond au bouton valider du Login cette variable sert à gérer sa disponibilité
   * en le mttant à false à true si la boite de l'A2F est affiché ou non
   */
  callBackLogin(json: APILOGIN_OUT) {

    if (json.use2fa != undefined && json.use2fa == 1) {
      this.display2fa = "block";
      this.button = true;
      console.log("true")
      return
    } else {
      this.display2fa = "none"
      this.button = false;
      console.log("false")
    }
    this.router.navigate(['/', 'main_menu'])
    
    if (json.forceChange != undefined && json.forceChange == 1) {
      this.router.navigate(['/', 'change_pass']);
      return
    }

    if (typeof json.session != "undefined") {
      this.api.session_str = json.session;
      //Cookie.set("SADTI",JSON.stringify(json.session));
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

    //this.router.navigate(['/', 'main_menu'])
    
    
      
  }


  go() {
    console.log(" login: yannis.sileber \n mdp : TestDeLaMort1234@ \nancien mdp: dAn1oCLV \n");

  }


  /*
    Fonction qui permet de changer le chemin de l'icone d'oeil
    dans le champs du mot de passe 
  */
  hidePass(): boolean {


    this.off = !this.off;
    if (this.off == false) {
      this.url = "assets/icon/on.png";
    } else {
      this.url = "assets/icon/off.png";

    }
    console.log(this.off.valueOf());
    return this.off;

  }

  /**
   * @var type correspond au type d'input 
   * @var url correspond au chemin du fichier de l'image
   * @returns  Retourne le type que l'input prendra 
   *Fonction qui permet de "switcher" entre texte clair et texte masqué 
    dans le champ mot de passe du formulaire
  */
  getClass(): String {
    if (this.url === "assets/icon/on.png") {
      this.type = "text";
    } else {
      this.type = "password";
    }
    return this.type;
  }


  loginAuth2fa(authfa: string): any {
    console.log(authfa)
    this.onSubmit(authfa);
    return authfa
  }

}



