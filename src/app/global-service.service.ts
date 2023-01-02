import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class GlobalServiceService {

  constructor() { }

  test!:String;
  handleRefresh(event: any) {
    setTimeout(() => {
      // Any calls to load data go here
      window.location.reload();
      event.target.complete();
    }, 2000);
  };
}

export class Navigate{
  constructor(private router:Router) {}

  url! : String

go(){
  this.router.navigate([this.url]);
}


}

