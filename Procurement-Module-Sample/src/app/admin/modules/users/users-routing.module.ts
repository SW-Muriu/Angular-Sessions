import { Component, NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AccountLogsComponent } from "./pages/account-logs/account-logs.component";
import { ActiveAccountsComponent } from "./pages/active-accounts/active-accounts.component";
import { AddAccountComponent } from "./pages/add-account/add-account.component";
import { DeletedAccountsComponent } from "./pages/deleted-accounts/deleted-accounts.component";
import { InactiveAccountsComponent } from "./pages/inactive-accounts/inactive-accounts.component";
import { LockedAccountsComponent } from "./pages/locked-accounts/locked-accounts.component";
import { ModifyAccountComponent } from "./pages/modify-account/modify-account.component";

const routes: Routes = [
  {
    path: "all",

    component: ActiveAccountsComponent,
  },
  {
    path: "inactive-accounts",

    component: InactiveAccountsComponent,
  },
  {
    path: "locked-accounts",

    component: LockedAccountsComponent,
  },
  {
    path: "deleted-accounts",

    component: DeletedAccountsComponent,
  },
  {
    path: "add-account",

    component: AddAccountComponent,
  },
  {
    path: "modify-account/:id",

    component: ModifyAccountComponent,
  },
  {
    path: "account-logs/:id",

    component: AccountLogsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule {}
