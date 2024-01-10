import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccessStatusPage } from './access-status.page';

const routes: Routes = [
  {
    path: '',
    component: AccessStatusPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccessStatusPageRoutingModule {}
