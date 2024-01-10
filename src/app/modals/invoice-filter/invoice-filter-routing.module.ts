import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InvoiceFilterPage } from './invoice-filter.page';

const routes: Routes = [
  {
    path: '',
    component: InvoiceFilterPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InvoiceFilterPageRoutingModule {}
