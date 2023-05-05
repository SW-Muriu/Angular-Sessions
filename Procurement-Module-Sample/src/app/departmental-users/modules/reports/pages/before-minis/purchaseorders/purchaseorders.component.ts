import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { PoParametersComponent } from './dialog/po-parameters/po-parameters.component';

@Component({
  selector: 'app-purchaseorders',
  templateUrl: './purchaseorders.component.html',
  styleUrls: ['./purchaseorders.component.sass']
})
export class PurchaseordersComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  poParameters(params: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "500px";
    dialogConfig.data = {
      test: params,
      // spec: "bulk"
    };
    this.dialog.open(PoParametersComponent, dialogConfig);
  }
}
