import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddMembersPageRoutingModule } from './add-members-routing.module';

import { AddMembersPage } from './add-members.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddMembersPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [AddMembersPage]
})
export class AddMembersPageModule {}
