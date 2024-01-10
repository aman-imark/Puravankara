import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TimePickPage } from './time-pick.page';

const routes: Routes = [
  {
    path: '',
    component: TimePickPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TimePickPageRoutingModule {}
