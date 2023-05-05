import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { InvoiceParamsComponent } from './dialog/invoice-params/invoice-params.component';


@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.sass']
})
export class InvoicesComponent implements OnInit {

 
  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  paymentParameters(params: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "500px";
    dialogConfig.data = {
      test: params,
      // spec: "bulk"
    };
    this.dialog.open(InvoiceParamsComponent, dialogConfig);
  }
}
