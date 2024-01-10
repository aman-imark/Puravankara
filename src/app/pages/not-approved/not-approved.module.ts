import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NotApprovedPageRoutingModule } from './not-approved-routing.module';

import { NotApprovedPage } from './not-approved.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NotApprovedPageRoutingModule
  ],
  declarations: [NotApprovedPage]
})
export class NotApprovedPageModule {}
