import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SiteVisitPage } from './site-visit.page';

const routes: Routes = [
  {
    path: '',
    component: SiteVisitPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SiteVisitPageRoutingModule {}
