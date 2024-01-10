import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RevenueLocationPage } from './revenue-location.page';

const routes: Routes = [
  {
    path: '',
    component: RevenueLocationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RevenueLocationPageRoutingModule {}
