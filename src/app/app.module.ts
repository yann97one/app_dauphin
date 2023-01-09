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
import { CookieService } from 'ng2-cookies';
import { ApiService } from './api.service';
import { ListProjetComponent } from './list-projet/list-projet.component';
import { BiometrieComponent } from './biometrie/biometrie.component';
import { Tab1Page } from './tab1/tab1.page';
import { Tab2Page } from './tab2/tab2.page';
import { Tab3Page } from './tab3/tab3.page';


@NgModule({
  declarations: [AppComponent ,ChangeMdpComponent,MenuPrincipalComponent,PageProjetComponent,ListProjetComponent,BiometrieComponent,Tab1Page,Tab2Page,Tab3Page],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,HttpClientModule,FormsModule],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy},
    { provide: HTTP_INTERCEPTORS, useClass: HttpRequestService, multi: true},
    CookieService,
    ApiService
    
    
    ],
  bootstrap: [AppComponent],
})
export class AppModule {
  
}




	//201
