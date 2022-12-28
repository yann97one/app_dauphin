import { AfterViewInit, Component, OnInit } from '@angular/core';
import { APILOGIN_IN, APILOGIN_OUT, APIRECUP, ApiService } from '../api.service';

@Component({
  selector: 'app-page-projet',
  templateUrl: './page-projet.component.html',
  styleUrls: ['../app.component.scss','./page-projet.component.scss'],
})
export class PageProjetComponent implements OnInit,AfterViewInit {
  date! : string;
  comment! : string;
  select! : string;
  heure! : number;
  IsDisabled! : boolean;
  name!:string;
  
  constructor(private api : ApiService) { }
  ngAfterViewInit(): void {
    var recup : APIRECUP;
    recup = {
      "id": 6,
      "project":this.name,
      "createDate":new Date(),
      "enabled":1,
      "participant":"moi",
      "creatorId":2,
      "creatorLabel":"qqun",
    }
    
   this.api.recup(recup,(va_json_o:APILOGIN_OUT)=>(this.submit()))
  }

  ngOnInit() {}
 submit(){

 }

}
