import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExploreResidentialPageRoutingModule } from './explore-residential-routing.module';

import { ExploreResidentialPage } from './explore-residential.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExploreResidentialPageRoutingModule
  ],
  declarations: [ExploreResidentialPage]
})
export class ExploreResidentialPageModule {}
