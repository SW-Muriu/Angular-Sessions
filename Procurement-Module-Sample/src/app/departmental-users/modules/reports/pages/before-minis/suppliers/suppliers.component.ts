import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { SupplierParametersComponent } from './dialog/supplier-parameters/supplier-parameters.component';

@Component({
  selector: 'app-suppliers',
  templateUrl: './suppliers.component.html',
  styleUrls: ['./suppliers.component.sass']
})
export class SuppliersComponent implements OnInit {

  constructor( public dialog: MatDialog) { }

  ngOnInit(): void {
  }


  supplierParameters(params: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "500px";
    dialogConfig.data = {
      test: params,
      // spec: "bulk"
    };
    this.dialog.open(SupplierParametersComponent, dialogConfig);
  }

}
