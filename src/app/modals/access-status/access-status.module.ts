import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AccessStatusPageRoutingModule } from './access-status-routing.module';

import { AccessStatusPage } from './access-status.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AccessStatusPageRoutingModule
  ],
  declarations: [AccessStatusPage]
})
export class AccessStatusPageModule {}
