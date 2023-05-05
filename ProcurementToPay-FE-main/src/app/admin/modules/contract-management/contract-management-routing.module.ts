import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UploadContractDocumentsComponent } from './pages/upload-contract-documents/upload-contract-documents.component';

const routes: Routes = [
  { path: "upload-contract-documents", component: UploadContractDocumentsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContractManagementRoutingModule { }
