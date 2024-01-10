import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RevenueLocationPageRoutingModule } from './revenue-location-routing.module';

import { RevenueLocationPage } from './revenue-location.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RevenueLocationPageRoutingModule
  ],
  declarations: [RevenueLocationPage]
})
export class RevenueLocationPageModule {}
