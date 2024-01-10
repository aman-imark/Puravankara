import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InvoiceFilterPageRoutingModule } from './invoice-filter-routing.module';

import { InvoiceFilterPage } from './invoice-filter.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InvoiceFilterPageRoutingModule
  ],
  declarations: [InvoiceFilterPage]
})
export class InvoiceFilterPageModule {}
