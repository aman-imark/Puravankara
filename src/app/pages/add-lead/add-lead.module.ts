import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddLeadPageRoutingModule } from './add-lead-routing.module';

import { AddLeadPage } from './add-lead.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddLeadPageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [AddLeadPage],
})
export class AddLeadPageModule {}
