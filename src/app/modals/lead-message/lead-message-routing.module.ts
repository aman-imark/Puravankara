import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LeadMessagePage } from './lead-message.page';

const routes: Routes = [
  {
    path: '',
    component: LeadMessagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LeadMessagePageRoutingModule {}
