import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddContractComponent } from './add-contract/add-contract.component';
import { ApprovedContractsComponent } from './approved-contracts/approved-contracts.component';
import { DeletedContractsComponent } from './deleted-contracts/deleted-contracts.component';
import { EditContractComponent } from './dialogs/edit-contract/edit-contract.component';
import { ViewContractDetailsComponent } from './dialogs/view-contract-details/view-contract-details.component';
import { PendingContractsComponent } from './pending-contracts/pending-contracts.component';
import { RejectedContractsComponent } from './rejected-contracts/rejected-contracts.component';

const routes: Routes = [
  { path: "add-contract", component: AddContractComponent },
  { path: "edit-contract", component: EditContractComponent },
  { path: "view-contract", component: ViewContractDetailsComponent },
  { path: "pending-contracts", component: PendingContractsComponent },
  { path: "approved-contracts", component: ApprovedContractsComponent },
  { path: "rejected-contracts", component: RejectedContractsComponent },
  { path: "deleted-contracts", component: DeletedContractsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContractManagementRoutingModule { }
