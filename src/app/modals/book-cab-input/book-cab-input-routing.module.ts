import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BookCabInputPage } from './book-cab-input.page';

const routes: Routes = [
  {
    path: '',
    component: BookCabInputPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BookCabInputPageRoutingModule {}
