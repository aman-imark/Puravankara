import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SelectLeadActivePage } from './select-lead-active.page';

const routes: Routes = [
  {
    path: '',
    component: SelectLeadActivePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SelectLeadActivePageRoutingModule {}
