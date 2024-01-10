import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DeclarationsPage } from './declarations.page';

const routes: Routes = [
  {
    path: '',
    component: DeclarationsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DeclarationsPageRoutingModule {}
