import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TermsbPageRoutingModule } from './termsb-routing.module';

import { TermsbPage } from './termsb.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TermsbPageRoutingModule
  ],
  declarations: [TermsbPage]
})
export class TermsbPageModule {}
