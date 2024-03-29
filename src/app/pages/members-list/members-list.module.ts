import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MembersListPageRoutingModule } from './members-list-routing.module';

import { MembersListPage } from './members-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MembersListPageRoutingModule
  ],
  declarations: [MembersListPage]
})
export class MembersListPageModule {}
