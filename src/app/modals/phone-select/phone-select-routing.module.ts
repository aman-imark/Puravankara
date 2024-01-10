import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PhoneSelectPage } from './phone-select.page';

const routes: Routes = [
  {
    path: '',
    component: PhoneSelectPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PhoneSelectPageRoutingModule {}
