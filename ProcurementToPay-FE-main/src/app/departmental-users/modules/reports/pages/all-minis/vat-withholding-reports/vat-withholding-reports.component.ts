import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { VatParamsComponent } from './dialog/vat-params/vat-params.component';


@Component({
  selector: 'app-vat-withholding-reports',
  templateUrl: './vat-withholding-reports.component.html',
  styleUrls: ['./vat-withholding-reports.component.sass']
})
export class VatWithholdingReportsComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  vatParameters(params: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "500px";
    dialogConfig.data = {
      test: params,
      // spec: "bulk"
    };
    this.dialog.open(VatParamsComponent, dialogConfig);
  }
}
