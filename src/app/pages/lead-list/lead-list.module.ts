import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LeadListPageRoutingModule } from './lead-list-routing.module';

import { LeadListPage } from './lead-list.page';

import { DaysLeftPipe, DateOnlyPipe } from 'src/app/pipes/format-time.pipe';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    LeadListPageRoutingModule
  ],
  declarations: [LeadListPage, DaysLeftPipe, DateOnlyPipe]
})
export class LeadListPageModule {}
