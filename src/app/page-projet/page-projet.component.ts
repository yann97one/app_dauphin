import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-projet',
  templateUrl: './page-projet.component.html',
  styleUrls: ['../app.component.scss','./page-projet.component.scss'],
})
export class PageProjetComponent implements OnInit {
  date! : string;
  comment! : string;
  select! : string;
  heure! : number;
  IsDisabled! : boolean;
  
  
  constructor() { }

  ngOnInit() {}
 
submit(){
  
}
}
