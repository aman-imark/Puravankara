import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DatePickBirthPage } from './date-pick-birth.page';

const routes: Routes = [
  {
    path: '',
    component: DatePickBirthPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DatePickBirthPageRoutingModule {}
