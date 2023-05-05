import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { BiddersRoutingModule } from "./bidders-routing.module";
import { LockedAccountsComponent } from "./pages/bidders-management/locked-accounts/locked-accounts.component";
import { DeletedAccountsComponent } from "./pages/bidders-management/deleted-accounts/deleted-accounts.component";
import { AllBiddersComponent } from "./pages/bidders-management/all-bidders/all-bidders.component";
import { UpdateBidderPasswordComponent } from "./pages/bidders-management/dialogs/update-bidder-password/update-bidder-password.component";
import { RestoreAccountComponent } from "./pages/bidders-management/dialogs/restore-account/restore-account.component";
import { ActivateBidderAccountComponent } from "./pages/bidders-management/dialogs/activate-bidder-account/activate-bidder-account.component";
import { DeleteAccountComponent } from "./pages/bidders-management/dialogs/delete-account/delete-account.component";
import { LockAccountComponent } from "./pages/bidders-management/dialogs/lock-account/lock-account.component";
import { InactiveAccountsComponent } from "./pages/bidders-management/inactive-accounts/inactive-accounts.component";
import { CommonsModule } from "src/app/commons/commons.module";
import { SharedModule } from "src/app/shared/shared.module";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSortModule } from "@angular/material/sort";
import { MatIconModule } from "@angular/material/icon";
import { MatTableExporterModule } from "mat-table-exporter";
import { MatTableModule } from "@angular/material/table";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatDialogModule } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatMenuModule } from "@angular/material/menu";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatSelectModule } from "@angular/material/select";
import { ComponentsModule } from "src/app/shared/components/components.module";
import { BidderDetailsComponent } from './pages/bidders-management/dialogs/bidder-details/bidder-details.component';
import { DeactivateBidderComponent } from './pages/bidders-management/dialogs/deactivate-bidder/deactivate-bidder.component';
import { BiddersWidgetsComponent } from './pages/bidders-management/bidders-widgets/bidders-widgets.component';

@NgModule({
  declarations: [
    LockedAccountsComponent,
    DeletedAccountsComponent,
    AllBiddersComponent,
    UpdateBidderPasswordComponent,
    RestoreAccountComponent,
    ActivateBidderAccountComponent,
    DeleteAccountComponent,
    LockAccountComponent,
    InactiveAccountsComponent,
    BidderDetailsComponent,
    DeactivateBidderComponent,
    BiddersWidgetsComponent,
  ],
  imports: [
    CommonModule,
    BiddersRoutingModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatTableExporterModule,
    SharedModule,
    ComponentsModule,
    MatMenuModule,
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatDatepickerModule,
    MatProgressBarModule,
  ],
})
export class BiddersModule {}
