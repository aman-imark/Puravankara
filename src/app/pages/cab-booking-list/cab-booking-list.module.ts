import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CabBookingListPageRoutingModule } from './cab-booking-list-routing.module';

import { CabBookingListPage } from './cab-booking-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CabBookingListPageRoutingModule
  ],
  declarations: [CabBookingListPage]
})
export class CabBookingListPageModule {}
