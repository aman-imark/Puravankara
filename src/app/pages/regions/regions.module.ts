import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegionsPageRoutingModule } from './regions-routing.module';

import { RegionsPage } from './regions.page';

import { Ng2SearchPipeModule } from 'ng2-search-filter';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegionsPageRoutingModule,
    Ng2SearchPipeModule
  ],
  declarations: [RegionsPage]
})
export class RegionsPageModule {}
