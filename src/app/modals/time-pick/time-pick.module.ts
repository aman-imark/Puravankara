import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TimePickPageRoutingModule } from './time-pick-routing.module';

import { TimePickPage } from './time-pick.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TimePickPageRoutingModule
  ],
  declarations: [TimePickPage]
})
export class TimePickPageModule {}
