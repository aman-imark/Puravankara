import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExpiredLeadsPageRoutingModule } from './expired-leads-routing.module';

import { ExpiredLeadsPage } from './expired-leads.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExpiredLeadsPageRoutingModule
  ],
  declarations: [ExpiredLeadsPage]
})
export class ExpiredLeadsPageModule {}
