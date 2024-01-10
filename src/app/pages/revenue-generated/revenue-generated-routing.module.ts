import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RevenueGeneratedPage } from './revenue-generated.page';

const routes: Routes = [
  {
    path: '',
    component: RevenueGeneratedPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RevenueGeneratedPageRoutingModule {}
