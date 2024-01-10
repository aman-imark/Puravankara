import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ResidentialDetailsFlatsPage } from './residential-details-flats.page';

const routes: Routes = [
  {
    path: '',
    component: ResidentialDetailsFlatsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResidentialDetailsFlatsPageRoutingModule {}
