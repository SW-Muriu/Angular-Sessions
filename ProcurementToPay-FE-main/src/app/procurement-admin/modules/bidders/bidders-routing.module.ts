import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllBiddersComponent } from './pages/bidders-management/all-bidders/all-bidders.component';
import { DeletedAccountsComponent } from './pages/bidders-management/deleted-accounts/deleted-accounts.component';
import { InactiveAccountsComponent } from './pages/bidders-management/inactive-accounts/inactive-accounts.component';
import { LockedAccountsComponent } from './pages/bidders-management/locked-accounts/locked-accounts.component';

const routes: Routes = [
  { path: 'all-bidders', component: AllBiddersComponent },
  { path: 'inactive-accounts', component: InactiveAccountsComponent },
  { path: 'locked-accounts', component: LockedAccountsComponent },
  { path: 'deleted-accounts', component: DeletedAccountsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BiddersRoutingModule { }
