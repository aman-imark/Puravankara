import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OtpAuthPage } from './otp-auth.page';

const routes: Routes = [
  {
    path: '',
    component: OtpAuthPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OtpAuthPageRoutingModule {}
