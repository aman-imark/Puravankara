import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddRegionPage } from './add-region.page';

const routes: Routes = [
  {
    path: '',
    component: AddRegionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddRegionPageRoutingModule {}
