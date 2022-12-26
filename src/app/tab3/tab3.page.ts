import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { catchError } from 'rxjs';
import { HttpRequestService } from '../http-request.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
 
  public err! : number;
  public msg! : String;
  

  constructor(private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      this.err = params['err'];
      this.msg = params['msg'];
      
    })
  }

  
  
}
