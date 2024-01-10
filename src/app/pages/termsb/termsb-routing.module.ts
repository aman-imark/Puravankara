import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TermsbPage } from './termsb.page';

const routes: Routes = [
  {
    path: '',
    component: TermsbPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TermsbPageRoutingModule {}
