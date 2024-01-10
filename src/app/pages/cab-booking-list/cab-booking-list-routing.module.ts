import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CabBookingListPage } from './cab-booking-list.page';

const routes: Routes = [
  {
    path: '',
    component: CabBookingListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CabBookingListPageRoutingModule {}
