import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BookCabPage } from './book-cab.page';

const routes: Routes = [
  {
    path: '',
    component: BookCabPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BookCabPageRoutingModule {}
