import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-menu-principal',
  templateUrl: './menu-principal.component.html',
  styleUrls: ['./menu-principal.component.scss'],
})
export class MenuPrincipalComponent implements OnInit{

login!:string | any;
pwd!:string| any;
A2F!:string| any;
  constructor(private api:ApiService,private http:HttpClient) { }
  public date = new Date();
  public tab_menu = [
    "Projets",
    "Test",
    
  ]
 

  ngOnInit() {}

  handleRefresh(event: any) {
    setTimeout(() => {
      // Any calls to load data go here
      window.location.reload();
      event.target.complete();
    }, 500);
  };


  

}
