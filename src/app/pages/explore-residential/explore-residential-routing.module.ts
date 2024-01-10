import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExploreResidentialPage } from './explore-residential.page';

const routes: Routes = [
  {
    path: '',
    component: ExploreResidentialPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExploreResidentialPageRoutingModule {}
