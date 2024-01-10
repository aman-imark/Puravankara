import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BookCabPageRoutingModule } from './book-cab-routing.module';

import { BookCabPage } from './book-cab.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BookCabPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [BookCabPage]
})
export class BookCabPageModule {}
