import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UploadLeadsPage } from './upload-leads.page';

const routes: Routes = [
  {
    path: '',
    component: UploadLeadsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UploadLeadsPageRoutingModule {}
