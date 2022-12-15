import { IonicModule } from '@ionic/angular';
import { ErrorHandler, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
import {RouterModule} from '@angular/router';
import { Tab1PageRoutingModule } from './tab1-routing.module';



class MyErrorHandler implements ErrorHandler{
  handleError(error: any): void {
    switch (error)
          {
              case 404:
                  "Page non trouvée ou accès refusé";
              break;

              case  401:
                  "Accès non autorisé";
              break;

              case 500:
                "Erreur interne";
              break;
          }
        }
}
@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    Tab1PageRoutingModule,
    RouterModule,
    
  ],
  providers: [{provide: ErrorHandler, useClass: MyErrorHandler}],
  declarations: [Tab1Page]
})
export class Tab1PageModule {}
