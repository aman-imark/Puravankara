import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DatePickPage } from './date-pick.page';

const routes: Routes = [
  {
    path: '',
    component: DatePickPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DatePickPageRoutingModule {}
