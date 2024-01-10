import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DeclarationsPageRoutingModule } from './declarations-routing.module';

import { DeclarationsPage } from './declarations.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DeclarationsPageRoutingModule
  ],
  declarations: [DeclarationsPage]
})
export class DeclarationsPageModule {}
