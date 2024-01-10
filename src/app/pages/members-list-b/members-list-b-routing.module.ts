import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MembersListBPage } from './members-list-b.page';

const routes: Routes = [
  {
    path: '',
    component: MembersListBPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MembersListBPageRoutingModule {}
