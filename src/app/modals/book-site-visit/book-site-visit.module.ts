import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BookSiteVisitPageRoutingModule } from './book-site-visit-routing.module';

import { BookSiteVisitPage } from './book-site-visit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    BookSiteVisitPageRoutingModule
  ],
  declarations: [BookSiteVisitPage]
})
export class BookSiteVisitPageModule {}
