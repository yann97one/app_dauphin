import { HttpClient } from '@angular/common/http';
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
  name!:string | any;
  recup! : APIRECUP;
  constructor(private api : ApiService, private http: HttpClient) { }

  ngAfterViewInit(): void {
    
    this.api.recup(this.recup,(va_json_o:APILOGIN_OUT)=>(this.submit()))
    console.log(this.name);
    //this.api.recup(this.recup,(va_json_o:APILOGIN_OUT)=>(this.submit()))
  }

 


  ngOnInit() {}
 submit(){

 }

}
