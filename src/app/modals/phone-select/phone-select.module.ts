import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PhoneSelectPageRoutingModule } from './phone-select-routing.module';

import { PhoneSelectPage } from './phone-select.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PhoneSelectPageRoutingModule
  ],
  declarations: [PhoneSelectPage]
})
export class PhoneSelectPageModule {}
