import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // {
  //   path: '',
  //   loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  // },
  {
    path: 'splash',
    loadChildren: () => import('./pages/splash/splash.module').then( m => m.SplashPageModule)
  },
  {
    path: 'main',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'lead-message',
    loadChildren: () => import('./modals/lead-message/lead-message.module').then( m => m.LeadMessagePageModule)
  },
  {
    path: 'splash',
    loadChildren: () => import('./pages/splash/splash.module').then( m => m.SplashPageModule)
  },
  {
    path: 'get-started',
    loadChildren: () => import('./pages/get-started/get-started.module').then( m => m.GetStartedPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'faq',
    loadChildren: () => import('./pages/faq/faq.module').then( m => m.FaqPageModule)
  },
  {
    path: 'terms',
    loadChildren: () => import('./pages/terms/terms.module').then( m => m.TermsPageModule)
  },
  {
    path: 'termsb',
    loadChildren: () => import('./pages/termsb/termsb.module').then( m => m.TermsbPageModule)
  },
  {
    path: 'not-approved',
    loadChildren: () => import('./pages/not-approved/not-approved.module').then( m => m.NotApprovedPageModule)
  },
  {
    path: 'notifications',
    loadChildren: () => import('./pages/notifications/notifications.module').then( m => m.NotificationsPageModule)
  },
  {
    path: 'forgot',
    loadChildren: () => import('./pages/forgot/forgot.module').then( m => m.ForgotPageModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./pages/signup/signup.module').then( m => m.SignupPageModule)
  },
  {
    path: 'detail-verify',
    loadChildren: () => import('./pages/detail-verify/detail-verify.module').then( m => m.DetailVerifyPageModule)
  },
  {
    path: 'select-role',
    loadChildren: () => import('./pages/select-role/select-role.module').then( m => m.SelectRolePageModule)
  },
  {
    path: 'explore-residential',
    loadChildren: () => import('./pages/explore-residential/explore-residential.module').then( m => m.ExploreResidentialPageModule)
  },
  {
    path: 'revenue-generated',
    loadChildren: () => import('./pages/revenue-generated/revenue-generated.module').then( m => m.RevenueGeneratedPageModule)
  },
  {
    path: 'revenue-location',
    loadChildren: () => import('./pages/revenue-location/revenue-location.module').then( m => m.RevenueLocationPageModule)
  },
  {
    path: 'members-list',
    loadChildren: () => import('./pages/members-list/members-list.module').then( m => m.MembersListPageModule)
  },
  {
    path: 'add-members',
    loadChildren: () => import('./pages/add-members/add-members.module').then( m => m.AddMembersPageModule)
  },
  {
    path: 'add-lead',
    loadChildren: () => import('./pages/add-lead/add-lead.module').then( m => m.AddLeadPageModule)
  },
  {
    path: 'add-region',
    loadChildren: () => import('./pages/add-region/add-region.module').then( m => m.AddRegionPageModule)
  },
  {
    path: 'regions',
    loadChildren: () => import('./pages/regions/regions.module').then( m => m.RegionsPageModule)
  },
  {
    path: 'share',
    loadChildren: () => import('./modals/share/share.module').then( m => m.SharePageModule)
  },
  {
    path: 'members-list-b',
    loadChildren: () => import('./pages/members-list-b/members-list-b.module').then( m => m.MembersListBPageModule)
  },
  {
    path: 'expired-leads',
    loadChildren: () => import('./pages/expired-leads/expired-leads.module').then( m => m.ExpiredLeadsPageModule)
  },
  {
    path: 'book-cab',
    loadChildren: () => import('./pages/book-cab/book-cab.module').then( m => m.BookCabPageModule)
  },
  {
    path: 'book-cab-input',
    loadChildren: () => import('./modals/book-cab-input/book-cab-input.module').then( m => m.BookCabInputPageModule)
  },
  {
    path: 'invoices',
    loadChildren: () => import('./pages/invoices/invoices.module').then( m => m.InvoicesPageModule)
  },
  {
    path: 'invoice-details',
    loadChildren: () => import('./pages/invoice-details/invoice-details.module').then( m => m.InvoiceDetailsPageModule)
  },
  {
    path: 'invoice-filter',
    loadChildren: () => import('./modals/invoice-filter/invoice-filter.module').then( m => m.InvoiceFilterPageModule)
  },
  {
    path: 'residential-details',
    loadChildren: () => import('./pages/residential-details/residential-details.module').then( m => m.ResidentialDetailsPageModule)
  },
  {
    path: 'residential-details-flats',
    loadChildren: () => import('./pages/residential-details-flats/residential-details-flats.module').then( m => m.ResidentialDetailsFlatsPageModule)
  },
  {
    path: 'cab-booking-details',
    loadChildren: () => import('./pages/cab-booking-details/cab-booking-details.module').then( m => m.CabBookingDetailsPageModule)
  },
  {
    path: 'filter',
    loadChildren: () => import('./modals/filter/filter.module').then( m => m.FilterPageModule)
  },
  {
    path: 'member-details',
    loadChildren: () => import('./pages/member-details/member-details.module').then( m => m.MemberDetailsPageModule)
  },
  {
    path: 'booking-list',
    loadChildren: () => import('./pages/booking-list/booking-list.module').then( m => m.BookingListPageModule)
  },
  {
    path: 'cab-booking-list',
    loadChildren: () => import('./pages/cab-booking-list/cab-booking-list.module').then( m => m.CabBookingListPageModule)
  },
  {
    path: 'lead-list',
    loadChildren: () => import('./pages/lead-list/lead-list.module').then( m => m.LeadListPageModule)
  },
  {
    path: 'upload-leads',
    loadChildren: () => import('./modals/upload-leads/upload-leads.module').then( m => m.UploadLeadsPageModule)
  },
  {
    path: 'date-pick',
    loadChildren: () => import('./modals/date-pick/date-pick.module').then( m => m.DatePickPageModule)
  },
  {
    path: 'access-status',
    loadChildren: () => import('./modals/access-status/access-status.module').then( m => m.AccessStatusPageModule)
  },
  {
    path: 'time-pick',
    loadChildren: () => import('./modals/time-pick/time-pick.module').then( m => m.TimePickPageModule)
  },
  {
    path: 'select-lead-active',
    loadChildren: () => import('./modals/select-lead-active/select-lead-active.module').then( m => m.SelectLeadActivePageModule)
  },
  {
    path: 'otp-auth',
    loadChildren: () => import('./modals/otp-auth/otp-auth.module').then( m => m.OtpAuthPageModule)
  },
  {
    path: 'support',
    loadChildren: () => import('./pages/support/support.module').then( m => m.SupportPageModule)
  },
  {
    path: 'declarations',
    loadChildren: () => import('./pages/declarations/declarations.module').then( m => m.DeclarationsPageModule)
  },
  {
    path: 'date-pick-birth',
    loadChildren: () => import('./modals/date-pick-birth/date-pick-birth.module').then( m => m.DatePickBirthPageModule)
  },
  {
    path: 'phone-select',
    loadChildren: () => import('./modals/phone-select/phone-select.module').then( m => m.PhoneSelectPageModule)
  },
  {
    path: 'site-visit',
    loadChildren: () => import('./pages/site-visit/site-visit.module').then( m => m.SiteVisitPageModule)
  },
  {
    path: 'book-site-visit',
    loadChildren: () => import('./modals/book-site-visit/book-site-visit.module').then( m => m.BookSiteVisitPageModule)
  }
];


@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
