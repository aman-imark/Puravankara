import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DatePickPageRoutingModule } from './date-pick-routing.module';

import { DatePickPage } from './date-pick.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DatePickPageRoutingModule
  ],
  declarations: [DatePickPage]
})
export class DatePickPageModule {}
