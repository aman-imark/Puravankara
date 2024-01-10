import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UploadLeadsPageRoutingModule } from './upload-leads-routing.module';

import { UploadLeadsPage } from './upload-leads.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UploadLeadsPageRoutingModule
  ],
  declarations: [UploadLeadsPage]
})
export class UploadLeadsPageModule {}
