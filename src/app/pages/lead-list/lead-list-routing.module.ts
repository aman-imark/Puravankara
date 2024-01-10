import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LeadListPage } from './lead-list.page';

const routes: Routes = [
  {
    path: '',
    component: LeadListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LeadListPageRoutingModule {}
