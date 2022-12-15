import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpRequestService implements HttpInterceptor
{
 
  constructor(private router_o:Router) {}


  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> 
  {
    return next.handle(req).pipe(
      catchError((va_error_o:HttpErrorResponse) => 
        {
        
            
        switch (va_error_o.status)
          {
              case 404:
                  "Page non trouvée ou accès refusé";
                  this.router_o.navigate(['/forgetpass?err=401&msg='+va_error_o]);
              break;

              case  401:
                  "Accès non autorisé";
                  this.router_o.navigate(['/errPage'], { queryParams: { err: '401',  msg:va_error_o.message}})
              break;

              case 500:
                "Erreur interne";
                this.router_o.navigate(['/errPage?err=500&msg='+va_error_o])

              break;
              
          default:
                  
            break;
          }
         throw("Erreur");
        }));
        
  }
}



