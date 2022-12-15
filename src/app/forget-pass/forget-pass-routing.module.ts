import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForgetPassComponent } from './forget-pass.component';

const routes: Routes = [
  { path: 'forgetpass', component: ForgetPassComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class forgetpage {

}
