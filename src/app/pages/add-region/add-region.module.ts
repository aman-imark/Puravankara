import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddRegionPageRoutingModule } from './add-region-routing.module';

import { AddRegionPage } from './add-region.page';

import { Ng2SearchPipeModule } from 'ng2-search-filter';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddRegionPageRoutingModule,
    ReactiveFormsModule,
    Ng2SearchPipeModule    
  ],
  declarations: [AddRegionPage]
})
export class AddRegionPageModule {}
