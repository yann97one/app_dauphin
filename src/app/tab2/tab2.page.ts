import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthFacteursComponent } from '../auth-facteurs/auth-facteurs.component';
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  constructor(private router:Router) { }
  url! : String
  
  
go(){
  console.log("toto");
}
}
