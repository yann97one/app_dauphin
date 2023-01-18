import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { IonInput } from '@ionic/angular';
import { APIRECUP, ApiService } from '../api.service';
import * as moment from 'moment';

interface Project {
  id?: string;
  createDate?: string;
  creatorId?: string;
  creatorLabel?: string;
  enabled?: string;
  label?: string;
  locked?: number;
  participants?: {id:string, type: string}[];
  typeId?: string;
}
@Component({
  selector: 'app-page-projet',
  templateUrl: './page-projet.component.html',
  styleUrls: ['../app.component.scss', './page-projet.component.scss'],
})
export class PageProjetComponent implements OnInit, AfterViewInit {
  @ViewChild('input', { static: false }) input!: IonInput;
  jours = new Date()
   myMoment: moment.Moment = moment("someDate");
  date!:string;
  projectLabel!: string;
  projects!:string[];
  hours!: number;
  name!: string | any;
  recup!: APIRECUP;
  value!:string;
  charging!: number;
  login!: string | any;
  pwd!: string | any;
  projectid: any;
  minute!: number;
  comments!: string;
  constructor(private api: ApiService, private http: HttpClient) {
    // this.platform.backButton.subscribeWithPriority(10, () => {
    //   console.log('Handler was called!');
    // });
   }
   
   ngAfterViewInit(): void {
    //this.api.recup((va_json_re : APIRECUP)=>{this.callBackRecup(va_json_re)});
    
    this.http.get<any>(this.api.url+"/timemgnt/project?enabled=1",

      { reportProgress: true, responseType: "json", withCredentials: true })

      .subscribe((va_response_o) => {
          

        va_response_o.projects.map( (project:Project) =>{
          /**
           * On utilise la methode map pour parcourir le tableau des projets et récupérer les propriétés 'label' de chaque objet. 
           * et on utilise la méthode push pour ajouter ces labels dans le tableau vide que nous avons crée plus tôt.
           */
          if(project.label != null)
            this.labels.push(project.label)
        })
        //   this.projects = va_response_o.projects;
        //   console.log(this.projects.length)
        // if (va_response_o != null && va_response_o != undefined) {
        //   for (let i = 0; i < this.projects.length; i++) {
            
        //     this.name = va_response_o.projects[i].label;
        //     this.projectid = va_response_o.projects[i].id
        //     console.log(this.name)
        //   }
        // }
        if (va_response_o.error.code != 200) {

          return;

        }


        
        

      });
  }
  
  callBackRecup(va_json_re: APIRECUP) {
    console.log("REUSSI")
    console.log(this.name)
  }


test(){
  console.log(this.date)
}

  ngOnInit() { }
 submitProject() {

    var json : APIRECUP;
    
    console.log(this.projectid,this.charging,this.comments)
      var url = this.api.url+"/timemgnt/task" 
      var time = this.hours * 60 + this.minute
  
        json={
          "projectId":this.projectid,
          "date":this.date,
          "charging":time,
          "comment":this.comments
          }
      let headers = new HttpHeaders().set('Content-Type', 'application/json');
    this.http.post<any>(url,json,{ responseType: "json", observe: "response", withCredentials: true, headers:headers })
      .subscribe((va_response_o) => {
        this.callBackRecup(va_response_o.body)
      })
      
  }

  
  

  /*onclickOther(): void {

    this.http.get<any>("http://webapp.dauphintelecom-infrastructure.local/api/timemgnt/project",

      { reportProgress: true, responseType: "json", withCredentials: true })

      .subscribe((va_response_o) => {



        if (va_response_o.error.code != 200) {

          return;

        }



        console.log(va_response_o);

      });



  }*/

}
