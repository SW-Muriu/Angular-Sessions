import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { IncomeParamsComponent } from './dialog/income-params/income-params.component';


@Component({
  selector: 'app-income-withholding-reports',
  templateUrl: './income-withholding-reports.component.html',
  styleUrls: ['./income-withholding-reports.component.sass']
})
export class IncomeWithholdingReportsComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  incomeParameters(params: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "500px";
    dialogConfig.data = {
      test: params,
      // spec: "bulk"
    };
    this.dialog.open(IncomeParamsComponent, dialogConfig);
  }
}
