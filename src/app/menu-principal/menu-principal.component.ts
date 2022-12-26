import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu-principal',
  templateUrl: './menu-principal.component.html',
  styleUrls: ['./menu-principal.component.scss'],
})
export class MenuPrincipalComponent implements OnInit {

  constructor() { }
  public tab_menu = [
    "Projets",
    "Test"
  ]

  ngOnInit() {}

  


  

}
