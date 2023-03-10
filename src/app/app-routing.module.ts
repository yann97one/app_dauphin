import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthFacteursComponent } from './auth-facteurs/auth-facteurs.component';
import { BiometrieComponent } from './biometrie/biometrie.component';
import { ChangeMdpComponent } from './change-mdp/change-mdp.component';
import { ListProjetComponent } from './list-projet/list-projet.component';
import { MenuPrincipalComponent } from './menu-principal/menu-principal.component';
import { PageProjetComponent } from './page-projet/page-projet.component';
import { Tab1Page } from './tab1/tab1.page';
import { Tab2Page } from './tab2/tab2.page';
import { Tab3Page } from './tab3/tab3.page';

const routes: Routes = [
  //{ path: '',loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)},
  { path: 'forgetpass', component: Tab2Page },
  { path: 'login', component: Tab1Page },
  { path: 'errPage', component: Tab3Page },
  { path: 'change_pass', component: ChangeMdpComponent },
  { path: 'main_menu', component: MenuPrincipalComponent },
  { path: 'page_projet', component: PageProjetComponent },
  { path:'list_projet', component: ListProjetComponent},
  { path:'', component: BiometrieComponent},
  { path:'2fa', component: AuthFacteursComponent},
  
];
@NgModule({
  imports: [
    
    
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
