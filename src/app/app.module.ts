import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { HttpRequestService } from './http-request.service';

import { FormsModule } from '@angular/forms';
import { ChangeMdpComponent } from './change-mdp/change-mdp.component';
import { MenuPrincipalComponent } from './menu-principal/menu-principal.component';
import { PageProjetComponent } from './page-projet/page-projet.component';
@NgModule({
  declarations: [AppComponent ,ChangeMdpComponent,MenuPrincipalComponent,PageProjetComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,HttpClientModule,FormsModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy},
    {provide: HTTP_INTERCEPTORS, useClass: HttpRequestService, multi: true}
    ],
  bootstrap: [AppComponent],
})
export class AppModule {
  
}



//201