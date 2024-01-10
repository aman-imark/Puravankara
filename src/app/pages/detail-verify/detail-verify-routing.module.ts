import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailVerifyPage } from './detail-verify.page';

const routes: Routes = [
  {
    path: '',
    component: DetailVerifyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailVerifyPageRoutingModule {}
