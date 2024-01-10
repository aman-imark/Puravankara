import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DatePickBirthPageRoutingModule } from './date-pick-birth-routing.module';

import { DatePickBirthPage } from './date-pick-birth.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DatePickBirthPageRoutingModule
  ],
  declarations: [DatePickBirthPage]
})
export class DatePickBirthPageModule {}
