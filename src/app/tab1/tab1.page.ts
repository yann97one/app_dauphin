import { Component, ElementRef, EventEmitter, Output, QueryList, Renderer2, ViewChild } from '@angular/core';
import { APILOGIN_IN, APILOGIN_OUT, ApiService } from '../api.service';
import { Router, RouterModule } from '@angular/router';
import { HttpRequestService } from '../http-request.service';
import { Navigate } from '../global-service.service';


//import {MatIconRegistry}
@Component({

  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],


})



//Classe du component de la page de connexion
export class Tab1Page {
  ngOnInit(){
    
    
  }
 
  login!: string; //var qui enregistre l'entrée Login de l'utilisateur dans le formulaire
  pwd!: string; //var qui enregistre l'entrée mdp de l'utilisateur dans le formulaire
  auth2fa! : string;//var qui enregistre l'entrée d'A2F de l'utilisateur dans le formulaire
  type!: string; // Variable permettant de gérer le type d'input de mdp
  public url = "assets/icon/on.png"; 
  public off = false;
  forcedChange! : string;
  protected display2fa : string;
  button! : boolean;
  constructor(private api: ApiService,private rend : Renderer2, private router : Router) { 

    this.display2fa = "none";
  }

/*
Fonction qui vérifie l'entrée de l'utilisateur et si elles sont valides renvoie
vers la fonction callBackLogin()
*/ 
  onClick() {
    var vl_param_o : APILOGIN_IN;

    vl_param_o = {  "login":    this.login,
                    "password": this.pwd};
    if (this.display2fa!="none") {
      vl_param_o.key2fa = this.auth2fa;
    }

    if (this.display2fa!="none") {
      vl_param_o.key2fa = this.auth2fa;
    }

        
          this.api.login(vl_param_o,(va_json_o:APILOGIN_OUT)=>{this.callBackLogin(va_json_o)});
  }

  onSubmit(){
    var vl_param_o : APILOGIN_IN; 
    var vl_param_n : APILOGIN_OUT; 
     
    vl_param_o = {  "login":    this.login,
                    "password": this.pwd};
    if (this.display2fa!="none") {
      vl_param_o.key2fa = this.auth2fa;
      var log = JSON.stringify(this.login);
      var pass = JSON.stringify(this.pwd);
      localStorage.setItem('pass',pass);
      localStorage.setItem('log',log);
    }

     vl_param_n = {"forceChange": 0,
                   "error": {"code":0, "string": [""]}};
      if(vl_param_n.forceChange != null && vl_param_n.forceChange == 1){
          this.router.navigate(['/','change_pass'])
      }else{
        this.api.login(vl_param_o,(va_json_o:APILOGIN_OUT)=>{this.callBackLogin(va_json_o)});
        this.router.navigate(['/','main_menu'])
      }    
  }

/**
 * @param json Variable qui hérite de l'interface APILOGIN_OUT
 * Cette fonction sert à gérer l'affichage de la partie A2F 
 * elle ne l'affiche qu'a condition que la @var use2fa soit différent de null
 * 
 */
  callBackLogin(json: APILOGIN_OUT) {
    
    if(json.use2fa != undefined && json.use2fa ==1)
    {
      
      this.display2fa = "block";
      this.button = true;
    }else{
      this.display2fa = "none"
      this.button = false;
    }

    if(json.forceChange != undefined && json.forceChange ==1){
      this.router.navigate(['/','change_pass']);
    }

  }

 
  go() {
    console.log(" login: yannis.sileber \n mdp : TestDeLaMort1234@ \nancien mdp: dAn1oCLV \n");
    
  }
  

  /*
    Fonction qui permet de changer le chemin de l'icone d'oeil
    dans le champs du mot de passe 
  */
  hidePass(): boolean {
    console.log(this.off.valueOf());

    this.off = !this.off;
    if (this.off == true) {
      this.url = "assets/icon/on.png";
    } else {
      this.url = "assets/icon/off.png";
    }
    return this.off;

  }
  
/**
 * 
 * @returns  Retourne le type que l'input prendra 
 */
  /*
  Fonction qui permet de "switcher" entre texte clair et texte masqué 
  dans le champ mot de passe du formulaire
  */
  getClass(): String {
    if (this.url === "assets/icon/on.png"){
      this.type = "text";
    } else {
      this.type = "password";
    }
    return this.type;
  }


}

