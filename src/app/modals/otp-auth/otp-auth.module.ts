import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OtpAuthPageRoutingModule } from './otp-auth-routing.module';

import { OtpAuthPage } from './otp-auth.page';

import { FormatTimePipe } from 'src/app/pipes/format-time.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OtpAuthPageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [OtpAuthPage, FormatTimePipe]
})
export class OtpAuthPageModule {}
