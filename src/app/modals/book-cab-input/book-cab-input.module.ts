import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BookCabInputPageRoutingModule } from './book-cab-input-routing.module';

import { BookCabInputPage } from './book-cab-input.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BookCabInputPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [BookCabInputPage]
})
export class BookCabInputPageModule {}
