import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class GlobalServiceService {

  constructor() { }
}

export class Navigate{
  constructor(private router:Router) {}

  url! : String

go(){
  this.router.navigate([this.url]);
}
}