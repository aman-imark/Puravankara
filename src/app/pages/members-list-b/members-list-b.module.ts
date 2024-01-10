import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MembersListBPageRoutingModule } from './members-list-b-routing.module';

import { MembersListBPage } from './members-list-b.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MembersListBPageRoutingModule
  ],
  declarations: [MembersListBPage]
})
export class MembersListBPageModule {}
