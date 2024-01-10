import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ResidentialDetailsPageRoutingModule } from './residential-details-routing.module';

import { ResidentialDetailsPage } from './residential-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ResidentialDetailsPageRoutingModule
  ],
  declarations: [ResidentialDetailsPage]
})
export class ResidentialDetailsPageModule {}
