import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SelectLeadActivePageRoutingModule } from './select-lead-active-routing.module';

import { SelectLeadActivePage } from './select-lead-active.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SelectLeadActivePageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [SelectLeadActivePage]
})
export class SelectLeadActivePageModule {}
