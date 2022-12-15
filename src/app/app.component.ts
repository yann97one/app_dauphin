import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Route, Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private http: HttpClient) {}
  ngOnInit(): void {
    
    let headers = new HttpHeaders({
      'host': 'https://webapp.dauphintelecom-infrastructure.com/api/auth',
      
    });

    this.http
			.get('https://webapp.dauphintelecom-infrastructure.com/api/auth', {
				headers: headers
			})
			.subscribe(data => {
				console.log(data);
			});
      
  }
  title = 'api-auth';


  
}





