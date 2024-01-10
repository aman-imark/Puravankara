import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CabBookingDetailsPageRoutingModule } from './cab-booking-details-routing.module';

import { CabBookingDetailsPage } from './cab-booking-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CabBookingDetailsPageRoutingModule
  ],
  declarations: [CabBookingDetailsPage]
})
export class CabBookingDetailsPageModule {}
