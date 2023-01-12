import { Component, ElementRef, Input, OnInit, Output, ViewChild } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { APILOGIN_OUT } from '../api.service';


@Component({
  selector: 'app-auth-facteurs',
  templateUrl: './auth-facteurs.component.html',
  styleUrls: ['./auth-facteurs.component.scss'],
})
export class AuthFacteursComponent implements OnInit {
  display!:string;
  auth2fa!:string;
  @ViewChild('ConfirmButton') ConfirmButton!: ElementRef;//bouton
  @Output() authfa = new EventEmitter<string>()
  buttonClicked = new EventEmitter()
 json!:APILOGIN_OUT

  constructor() { }

  ngOnInit() {
    
  }

  authUser(authfa:any){
    this.authfa.emit(authfa);
    console.log(authfa);
  }

  /**
   * A faire:
   * -créer un evenement qui sert à notifier le parent quand l'utilisateur à cliqué sur le bouton de l'auth à 2 facteurs
   * 
   * 
   * 
   */
}
