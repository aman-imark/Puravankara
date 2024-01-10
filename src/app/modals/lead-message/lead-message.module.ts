import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LeadMessagePageRoutingModule } from './lead-message-routing.module';

import { LeadMessagePage } from './lead-message.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LeadMessagePageRoutingModule
  ],
  declarations: [LeadMessagePage]
})
export class LeadMessagePageModule {}
