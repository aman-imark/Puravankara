import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CabBookingDetailsPage } from './cab-booking-details.page';

const routes: Routes = [
  {
    path: '',
    component: CabBookingDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CabBookingDetailsPageRoutingModule {}
