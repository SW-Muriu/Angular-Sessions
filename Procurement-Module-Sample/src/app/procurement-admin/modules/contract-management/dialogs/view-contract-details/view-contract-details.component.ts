import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LocalStorageService } from 'src/app/admin/data/services/localstorage.service';
import { SupplierParamsService } from 'src/app/suppliers/data/services/supplier-parameters.service';
import { VerifyContractComponent } from '../verify-contract/verify-contract.component';

@Component({
  selector: 'app-view-contract-details',
  templateUrl: './view-contract-details.component.html',
  styleUrls: ['./view-contract-details.component.sass']
})
export class ViewContractDetailsComponent implements OnInit {

  routeState: any;
  selecContract: any;
  contractData: any;
  data: any;

  paramsExist: boolean = false;
  subscription!: Subscription;

  constructor(
    private router: Router,
    private localStorageService: LocalStorageService,
    private paramsService: SupplierParamsService,
    public dialog: MatDialog,
  ) {
    if (this.router.getCurrentNavigation().extras.state) {
      this.routeState = this.router.getCurrentNavigation().extras.state;
      if (this.routeState) {
        this.selecContract = this.routeState.selectedDetails
          ? JSON.parse(this.routeState.selectedDetails)
          : "";

        this.localStorageService.set("viewContract", this.selecContract);
      }
    }
  }

  ngOnInit(): void {
    this.contractData = this.localStorageService.get("viewContract");
    this.getData(this.contractData.supplierId)
  }

  editContract(data) {
    console.log("editContract: ", data);
    this.router.navigate(
      ["/procurement-admin/contract-management/edit-contract"],
      {
        state: {
          selectedDetails: JSON.stringify(data),
        },
      }
    );
  }
  getData(supplierId) {
    this.subscription = this.paramsService
      .getOrganisationPramsById(supplierId)
      .subscribe((res) => {
        this.data = res[0];
        //console.log("this.data = ", this.contractData);


      });
  }

  onClickDownloadPdf(item: any) {
    let base64String = item.file;
    this.downloadPdf(base64String, item.filename);
  }

  downloadPdf(base64String, fileName) {
    // Download PDF in Chrome etc.
    const source = `${base64String}`;
    const link = document.createElement("a");
    link.href = source;
    link.download = `${fileName}.pdf`;
    link.click();
  }

  verify() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "500px";
    dialogConfig.data = {
      data: this.contractData
    };
    const dialogRef = this.dialog.open(VerifyContractComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((result) => {
      this.getData(this.contractData.supplierId)
    });
  }

}
