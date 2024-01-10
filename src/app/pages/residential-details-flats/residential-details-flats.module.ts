import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ResidentialDetailsFlatsPageRoutingModule } from './residential-details-flats-routing.module';

import { ResidentialDetailsFlatsPage } from './residential-details-flats.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ResidentialDetailsFlatsPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [ResidentialDetailsFlatsPage]
})
export class ResidentialDetailsFlatsPageModule {}
