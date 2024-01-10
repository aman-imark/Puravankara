import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SiteVisitPageRoutingModule } from './site-visit-routing.module';

import { SiteVisitPage } from './site-visit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    SiteVisitPageRoutingModule
  ],
  declarations: [SiteVisitPage]
})
export class SiteVisitPageModule {}
