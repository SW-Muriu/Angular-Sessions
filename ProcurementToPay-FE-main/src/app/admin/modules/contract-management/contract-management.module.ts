import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContractManagementRoutingModule } from './contract-management-routing.module';
import { UploadContractManagementComponent } from './pages/upload-contract-management/upload-contract-management.component';
import { UploadContractDocumentsComponent } from './pages/upload-contract-documents/upload-contract-documents.component';


@NgModule({
  declarations: [
    UploadContractManagementComponent,
    UploadContractDocumentsComponent
  ],
  imports: [
    CommonModule,
    ContractManagementRoutingModule
  ]
})
export class ContractManagementModule { }
