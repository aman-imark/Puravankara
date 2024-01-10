import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailVerifyPageRoutingModule } from './detail-verify-routing.module';

import { DetailVerifyPage } from './detail-verify.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailVerifyPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [DetailVerifyPage]
})
export class DetailVerifyPageModule {}
