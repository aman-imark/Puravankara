import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BookSiteVisitPage } from './book-site-visit.page';

const routes: Routes = [
  {
    path: '',
    component: BookSiteVisitPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BookSiteVisitPageRoutingModule {}
