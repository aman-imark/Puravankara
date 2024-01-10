import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RevenueGeneratedPageRoutingModule } from './revenue-generated-routing.module';

import { RevenueGeneratedPage } from './revenue-generated.page';

import { NgApexchartsModule } from "ng-apexcharts";



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RevenueGeneratedPageRoutingModule,
    NgApexchartsModule
  ],
  declarations: [RevenueGeneratedPage]
})
export class RevenueGeneratedPageModule {}
